import React, { FC, useContext, useEffect } from 'react';
import api from '../../services/Axios';
import { AuthContext } from '../../services/Context';
import { Container } from './style';

const Profile: FC = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        (async () => {
            const request = await api.get(`user/${user?.id}`);

            console.log(request);
        })();
    }, [user])
    return (
        <Container>

        </Container>         
    )
}

export default Profile;