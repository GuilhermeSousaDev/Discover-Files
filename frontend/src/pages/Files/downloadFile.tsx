import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import api from '../../services/Axios';
import { FiDownload } from 'react-icons/fi';
import { Container, Title, Desc, Text, Button } from './style';

interface IFile {
    id: number;
    name: string;
    description: string;
    file: string;
    type: string;
    createdAt: Date;
    updatedAt: Date; 
}

const DownloadFile: FC = () => {
    const { id } = useParams();
    const [file, setFile] = useState<IFile>();

    useEffect(() => {
        (async () => {
            const { data } = await api.get<IFile>(`files/${id}`);

            setFile(data);
        })();
    }, [id]);

    return (
        <>
            <Navbar />
            <Container>
                {file?
                    <>
                        <Title>{file.name}</Title>
                        <Desc>{file.description}</Desc>
                        <Text>Type: {file.type}</Text>
                        <Text>{file.file}</Text>
                        <a href={`http://localhost:8081/files/${file.file}`} 
                        download>
                            <Button>Download <FiDownload /></Button>
                        </a>
                    </>
                    : '...Loading'
                }
            </Container>
        </>
    )
}

export default DownloadFile;