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
    file: {
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

const ListFiles: FC<IProp> = ({ file }) => {
    return (
        <Container>
            <LiContainer>
                <Text>ID: { file.id }</Text>
                <Text>Name: { file.name }</Text>
                <Text>Author: { file.user.name }</Text>
                Filename: { file.file.split('-')[1] } <br />
                Type : { file.type } <br />
                <Link to={`/files/${file.id}`}>
                    <Button>Ver Arquivo</Button>
                </Link>
            </LiContainer>
        </Container>
    )
}

export default ListFiles;