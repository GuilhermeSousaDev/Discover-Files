import React, { 
    FC,
    useState,
    useEffect,
    useContext,
} from 'react';
import { FiUpload } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { Container, Text, UploadContainer } from './style';
import { AuthContext } from '../../services/Context';
import Navbar from '../../components/Navbar';
import ModalSendData from '../../components/Modal/ModalSendData';

const Upload: FC = () => {
    const { isAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [file, setFile] = useState<File & {preview: string}>();
    const [color, setColor] = useState<string>('#fff');
    const [msg, setMsg] = useState<string>('Clique ou Arraste o Arquivo');

    useEffect(() => {
        if(!isAuth) {
            navigate('/login');
        }
    }, [isAuth, navigate]);
    
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
                            <ModalSendData 
                                msg={msg}
                                file={file} 
                                setMsg={setMsg} 
                            />
                        </> : ''
                }
                
            </Container>
        </>
    )
};

export default Upload;