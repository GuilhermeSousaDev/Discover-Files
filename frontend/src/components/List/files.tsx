import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, LiContainer, Text } from './style';

interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    avatar: string
    createdAt: Date;
    updatedAt: Date;
}

interface IProp {
    files: {
        id: number
        name: string
        description: string
        type: string
        file: string
        user: IUser;
        createdAt: Date;
        updatedAt: Date;
    }
}

const ListFiles: FC<IProp> = ({ files }) => {
    return (
        <Container>
            <LiContainer>
                <Text>ID: { files.id }</Text>
                <Text>Name: { files.name }</Text>
                <Text>Author: { files.user.name }</Text>
                Filename: { files.file.split('-')[1] } <br />
                Type : { files.type } <br />
                <Link to={`/files/${files.id}`}>
                    <Button>Ver Arquivo</Button>
                </Link>
            </LiContainer>
        </Container>
    )
}

export default ListFiles;