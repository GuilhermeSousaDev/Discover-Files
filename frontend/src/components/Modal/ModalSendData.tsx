import React, { ChangeEvent, FC, useCallback, useContext, useState } from 'react';
import { Button } from '../../pages/Upload/style';
import api from '../../services/Axios';
import { AuthContext } from '../../services/Context';

interface IData {
    [key: string]: string;
}

interface IProp {
    file: File & { preview: string };
}

const ModalSendData: FC<IProp> = ({ file }) => {
    const { token } = useContext(AuthContext);
    const [data, setData] = useState<IData>();

    const handleData = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }, [data]);

    const sendFile = useCallback(async () => {
        if(file && data) {
            const form = new FormData();

            form.append('file', file);
            form.append('name', data.name);
            form.append('description', data.description);

            const request = await api.post('/files', form, {
                headers: {
                    Authorization: token as string,
                }
            });

            console.log(request);
        }
    }, [file, data, token]);

    return (
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
            <Button onClick={sendFile}>Send Data</Button>
        </>
    )
};

export default ModalSendData;