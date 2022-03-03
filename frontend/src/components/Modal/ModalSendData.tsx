import React, { 
    ChangeEvent, 
    FC, 
    useCallback, 
    useContext, 
    useEffect, 
    useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../pages/Upload/style';
import api from '../../services/Axios';
import { AuthContext } from '../../services/Context';

interface IData {
    [key: string]: string;
}

interface IProp {
    file: File & { preview: string };
    setMsg: React.Dispatch<React.SetStateAction<string>>;
}

interface IProgress {
    loaded: number;
    total: number;
}

const ModalSendData: FC<IProp> = ({ file, setMsg }) => {
    const { token, user } = useContext(AuthContext);
    //navigate = useNavigate();

    const [data, setData] = useState<IData>();
    const [progress, setProgress] = useState<IProgress>();

    /*useEffect(() => {
        if(progress?.loaded === progress?.total) {
            setMsg('Upload Finalizado!');
            setTimeout(() => navigate('/files'), 2000);
        }
    }, [progress, setMsg, navigate]);*/

    const handleData = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }, [data]);

    const sendFile = useCallback(async () => {
        if(file && data && user) {
            const form = new FormData();

            form.append('file', file);  
            form.append('name', data.name);
            form.append('description', data.description);
            form.append('user', user.id);

            const request = await api.post('/files', form, { 
                headers: {
                    Authorization: token as string,
                },
                onUploadProgress: (progressEvent) => {
                    console.log(progressEvent);
                    setProgress({
                        loaded: progressEvent.loaded,
                        total: progressEvent.total,
                    });
                },
            });

            console.log(request);
        }
    }, [file, data, token, user]);

    return (
        <>
            <progress 
                value={progress?.loaded} 
                max={progress?.total}>
            </progress>
            <br />
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
            <br />
            <Button onClick={sendFile}>Send Data</Button>  
        </>
    )
};

export default ModalSendData;