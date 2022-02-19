import React, { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../services/Context';

const Home: FC = () => {
    const navigate = useNavigate();
    const { isAuth } = useContext(AuthContext);

    if(!isAuth) {
        navigate('/login');
    }

    return (
        <>
            <h1>Home</h1>
        </>
    );
};

export default Home;