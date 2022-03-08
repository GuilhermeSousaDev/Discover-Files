import React, { FC, useCallback, useEffect, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';
import { Button, Container } from './style';

const ModalChangeAvatar: FC = () => {

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
    
    const handleChangeAvatar = useCallback(() => {
        console.log(file);
    }, [file]);

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