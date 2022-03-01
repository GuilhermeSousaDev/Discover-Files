import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import api from '../../services/Axios';
import { Container, Title } from './style';

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

const ListUniqueFile: FC = () => {
    const { id } = useParams();
    const [file, setFile] = useState<IFile & { contentFile: string }>();

    useEffect(() => {
        (async () => {
            const { data } = await api.get(`files/${id}`);

            setFile(data);
        })();
    }, [id]);

    return (
        <>
            <Navbar />
            <Container>
                {file?.contentFile}
            </Container>
        </>
    )
}

export default ListUniqueFile;