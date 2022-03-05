import React, { 
    ChangeEvent, 
    FC, 
    useCallback, 
    useContext, 
    useState,
} from 'react';
import { Button } from '../../pages/Upload/style';
import api from '../../services/Axios';
import { AuthContext } from '../../services/Context';

interface IData {
    [key: string]: string;
}

interface IProp {
    file: File & { preview: string };
    setMsg: React.Dispatch<React.SetStateAction<string>>;
    msg: string;
}

interface IProgress {
    loaded: number;
    total: number;
}

const ModalSendData: FC<IProp> = ({ file, setMsg, msg }) => {
    const { token, user } = useContext(AuthContext);

    const [data, setData] = useState<IData>();
    const [category, setCategory] = useState<string>();
    const [progress, setProgress] = useState<IProgress>();

    const handleData = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }, [data]);

    const handleSelectData = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    }, []);

    const sendFile = useCallback(async () => {
        if(file && data && user && category) {
            const form = new FormData();

            form.append('file', file);  
            form.append('name', data.name);
            form.append('description', data.description);
            form.append('category', category);
            form.append('user', user.id);

            const request = await api.post('/files', form, { 
                headers: {
                    Authorization: token as string,
                },
                onUploadProgress: (progressEvent) => {
                    setProgress({
                        loaded: progressEvent.loaded,
                        total: progressEvent.total,
                    });
                },
            });

            if(request.data) {
                setMsg('Upload Finalizado!');
            }
        }
    }, [file, data, token, user, category, setMsg]);

    return (
        <>
            <progress 
                value={progress?.loaded} 
                max={progress?.total}>
            </progress>
            <br />
            
            {msg !== 'Upload Finalizado!'?
                <>
                    <input 
                        onChange={handleData}
                        type="text" 
                        placeholder='Name' 
                        name='name'
                    />
                    <input 
                        onChange={handleData}
                        type="text" 
                        placeholder='Description' 
                        name='description'
                    />
                    <select onChange={handleSelectData} name="category">
                        <option value="App">App</option>
                        <option value="Image">Image</option>
                        <option value="Video">Video</option>
                        <option value="Book">Book</option>
                        <option value="pdf">PDF</option>
                    </select>
                    <br />
                    <Button onClick={sendFile}>Send Data</Button> 
                </> : ''
            }  
        </>
    )
};

export default ModalSendData;