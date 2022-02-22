import React, { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../services/Context';
import Navbar from '../../components/Navbar';

const Home: FC = () => {
    const navigate = useNavigate();
    const { isAuth } = useContext(AuthContext);

    if(!isAuth) {
        navigate('/login');
    }

    return (
        <>
            <Navbar />
            <h1>Home</h1>
        </>
    );
};

export default Home;