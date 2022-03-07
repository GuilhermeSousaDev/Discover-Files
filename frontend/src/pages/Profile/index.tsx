import React, { FC, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import api from '../../services/Axios';
import { AuthContext } from '../../services/Context';
import { Container } from './style';

interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    avatar: string
    createdAt: Date;
    updatedAt: Date;
}

const Profile: FC = () => {
    const { token } = useContext(AuthContext);
    const { id } = useParams();

    const [data, setData] = useState<IUser>();

    useEffect(() => {
        (async () => {
            const request = await api.get(`/user/${id}`, {
                headers: {
                    Authorization: token as string,
                }
            });

            if(!data) {
                setData(request.data);
            }
        })();
    }, [data, token, id]);
    return (
        <>
            <Navbar />
            <Container>
                {data?
                   <>
                    {data.name} <br />
                    {data.email} <br />
                    
                   </> : '...Loading'
                }
            </Container>
        </>         
    )
}

export default Profile;