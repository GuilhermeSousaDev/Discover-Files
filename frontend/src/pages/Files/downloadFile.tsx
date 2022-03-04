import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import api from '../../services/Axios';
import { FiDownload } from 'react-icons/fi';
import { Container, Title, Desc, Text, Button } from './style';

interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    avatar: string
    createdAt: Date;
    updatedAt: Date;
}

interface IFile {
    id: number
    name: string
    description: string
    type: string
    file: string
    user: IUser;
    createdAt: Date;
    updatedAt: Date;
}

const DownloadFile: FC = () => {
    const { id } = useParams();
    const [file, setFile] = useState<IFile>();

    useEffect(() => {
        (async () => {
            const { data } = await api.get<IFile>(`files/${id}`);

            console.log(data);

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
                        <Title>Uploaded_By - {file.user.name}</Title>
                        <a href={`http://localhost:8081/files/${file.file}`} 
                        download target="_blank" rel="noreferrer">
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