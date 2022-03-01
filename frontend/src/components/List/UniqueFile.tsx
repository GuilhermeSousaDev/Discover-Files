import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Title } from './style';

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

const UniqueFile: FC<IProp> = ({ files }) => {
    return (
        <Container>
            <Title>{files.name}</Title>
            <div>
                ID: { files.id } <br />
                Name: { files.name } <br />
                Description: { files.description } <br />
                Filename: { files.file.split('-')[1] } <br />
                Type: { files.type } <br />
                <Link to={`/files/${files.id}`}>
                    <Button>Ver Arquivo</Button>
                </Link>
            </div>
        </Container>
    )
}

export default UniqueFile;