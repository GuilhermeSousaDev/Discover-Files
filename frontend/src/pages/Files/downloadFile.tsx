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
    file: {
        id: number
        name: string
        description: string
        category: string;
        type: string
        file: string
        user: IUser;
        createdAt: Date;
        updatedAt: Date;
    }
    size: string;
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
                        <Title>{file.file.name}</Title>  
                        <Desc>{file.file.description}</Desc>
                        <Text>Type: {file.file.type}</Text>
                        <Text>Category: {file.file.category}</Text>
                        <Text>{file.file.file}</Text>
                        <Title>Uploaded_By - {file.file.user.name}</Title>
                        <Text>Size: {file.size}</Text>
                        <a href={`http://localhost:8081/files/${file.file.file}`} 
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