import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import api from '../../services/Axios';
import { FiDownload } from 'react-icons/fi';
import { Container, Title, Desc, Text, Button } from './style';

interface IFile {
    file: {
        id: number;
        name: string;
        description: string;
        file: string;
        type: string;
        createdAt: Date;
        updatedAt: Date;
    }
    contentFile: string;
}

const ListUniqueFile: FC = () => {
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
                        <Text>{file.file.file}</Text>
                        <a href={`download/http://localhost:8081/files/${file.file.file}`} download={file.file.file}>
                            <Button>Download <FiDownload /></Button>
                        </a>
                    </>
                    : '...Loading'
                }
            </Container>
        </>
    )
}

export default ListUniqueFile;