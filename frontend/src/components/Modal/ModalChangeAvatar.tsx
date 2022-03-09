import React, { FC, useCallback, useContext, useState } from 'react';
import api from '../../services/Axios';
import { AuthContext } from '../../services/Context';
import { FiUpload } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from './style';

const ModalChangeAvatar: FC = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [color, setColor] = useState<string>('#fff');
    const [file, setFile] = useState<File & { preview: string }>();
    const [msg, setMsg] = useState<string>('Clique ou Arraste o Arquivo');

    const { getRootProps } = useDropzone({
        onDragEnter: () => setColor('#14163c'),
        onDragLeave: () => setColor('#fff'),
        onDropAccepted: () => {
            setColor('#28a745');
            setMsg('Arquivo Recebido!');
        },
        onDrop: (acceptedFiles) => {
            acceptedFiles.map(file => {
                setFile(Object.assign(file, {
                    preview: URL.createObjectURL(file),
                }));
            })
        },
        accept: 'image/png, image/jpeg, image/jpg',
    });
    
    const handleChangeAvatar = useCallback(async () => {
        if(file) {
            const formFile = new FormData();
            formFile.append('file', file);

            const { data } = await api.put('/avatar', formFile, {
                headers: {
                    Authorization: token as string,
                }
            });

            if(data) {
                navigate('/');
            }
        }
    }, [file, token, navigate]);

    return (
        <>
            <Container color={color} {...getRootProps()}>
                <FiUpload />
                <span>{msg}</span>
            </Container>
            <br />
            {file?.preview?
                <img 
                    style={{
                        borderRadius: '10px',
                        width: '200px',
                        height: '200px',
                    }}
                    src={file?.preview} 
                    alt="image_upload" 
                /> 
                : ''
            }
            {file?
                <Button onClick={handleChangeAvatar}>Change Avatar</Button> : ''
            }
        </>
    )
}

export default ModalChangeAvatar;