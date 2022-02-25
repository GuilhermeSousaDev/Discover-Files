import React, { 
    FC,
    useState,
} from 'react';
import { FiUpload } from 'react-icons/fi';
import { Container, Text, UploadContainer } from './style';
import { useDropzone } from 'react-dropzone';
import Navbar from '../../components/Navbar';
import ModalSendData from '../../components/Modal/ModalSendData';

const Upload: FC = () => {
    const [file, setFile] = useState<File & {preview: string}>();
    const [color, setColor] = useState<string>('#fff');
    const [msg, setMsg] = useState<string>('Clique ou Arraste o Arquivo');
    
    const { getRootProps }  = useDropzone({
        onDrop: acceptedFiles => {
            setColor('#fff');
            setFile(Object.assign(acceptedFiles[0], {
                preview: URL.createObjectURL(acceptedFiles[0]),
            }));
        },
        onDragEnter: () => setColor('#1a3365'),
        onDragLeave: () => setColor('#fff'),
        onDropAccepted: () => {
            setMsg('Pronto para envio');
            setColor('#28a745');
        },
    });

    return (
        <>
            <Navbar />
            <Container>
                <UploadContainer 
                    {...getRootProps()}
                    color={color}
                >
                    <FiUpload />
                    <Text>{msg}</Text>
                </UploadContainer>
                {
                        file?
                            <>
                                <img src={file.preview} alt="" /> 
                                <ModalSendData file={file} />
                            </> : ''
                }
                
            </Container>
        </>
    )
};

export default Upload;