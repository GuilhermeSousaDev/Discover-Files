import React, { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListFiles from '../../components/List/files';
import Navbar from '../../components/Navbar';
import api from '../../services/Axios';
import { Button, Container, InitialDiv, Title, UlContainer } from './style';

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

const Files: FC = () => {
    const [files, setFiles] = useState<IFile[]>();

    useEffect(() => {
        (async () => {
            const { data } = await api.get('/files');

            if(!files) {
                setFiles(data);
            }
        })();
    }, [files]);

    return (
        <>
            <Navbar />
            <Container>
                <InitialDiv>
                    <Title>Melhores Arquivos</Title>
                    <Link to={'/files/category'}>
                        <Button>Find By Category</Button>
                    </Link>
                </InitialDiv>

                <UlContainer>
                    { files?.length? 
                        files.map(file => 
                            <ListFiles key={file.id} file={file} />
                        )
                        : '...Loading' 
                    }
                </UlContainer>
            </Container>
        </>
    )
}

export default Files;