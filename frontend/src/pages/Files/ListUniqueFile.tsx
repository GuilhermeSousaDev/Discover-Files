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
    const [file, setFile] = useState<IFile>();

    useEffect(() => {
        (async () => {
            const request = await api.get(`files/${id}`);

            console.log(request);
        })();
    }, [id]);

    return (
        <>
            <Navbar />
            <Container>
                
            </Container>
        </>
    )
}

export default ListUniqueFile;