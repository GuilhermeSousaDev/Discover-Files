import React, { FC, useState, useRef, MutableRefObject } from 'react';
import { FiUpload } from 'react-icons/fi';
import { Container, Text, UploadContainer } from './style';
import Navbar from '../../components/Navbar';

const Upload: FC = () => {
    const inpFileRef = useRef() as MutableRefObject<HTMLInputElement>; 
    const [color, setColor] = useState<string>('#fff');

    const handleFile = (e: any) => {
        console.log(e.dataTransfer)
        setColor('#fff');
        console.log(inpFileRef);
    };

    const handleEnterFile = () => {
        setColor('#ffbb00');
    }

    const handleLeaveFile = () => {
        setColor('#fff');
    }

    const handleClickFile = () => inpFileRef.current.click();

    return (
        <>
            <Navbar />
            <Container>
                <UploadContainer 
                    color={color}
                    onDrop={handleFile}
                    onDragEnter={handleEnterFile}
                    onDragLeave={handleLeaveFile}
                    onClick={handleClickFile}
                >
                    <FiUpload />
                    <Text>Clique ou Arraste o Arquivo</Text>
                    <input ref={inpFileRef} type="file" />
                </UploadContainer>
            </Container>
        </>
    )
};

export default Upload;