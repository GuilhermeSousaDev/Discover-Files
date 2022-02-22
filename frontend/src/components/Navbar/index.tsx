import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Nav, Title, Sign } from './style';
import { FiUpload } from 'react-icons/fi';

const Navbar: FC = () => {
    return (
        <Nav>
            <Link to={'/files'}>
                <Button>Procurar Arquivos</Button>
            </Link>
            <Link to={'/'}>
                <Title><FiUpload />DropFile</Title>
            </Link>
            <Link to={'/login'}><Sign>Sign in</Sign></Link>
        </Nav>
    )
};

export default Navbar;