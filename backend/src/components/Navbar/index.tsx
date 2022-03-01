import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Nav, Title, SignOrProfile } from './style';
import { FiUpload } from 'react-icons/fi';
import { AuthContext } from '../../services/Context/'

const Navbar: FC = () => {
    const { isAuth } = useContext(AuthContext);

    return (
        <Nav>
            <Link to={'/upload'}>
                <Button>Upload Files</Button>
            </Link>
            <Link to={'/'}>
                <Title><FiUpload />DropFile</Title>
            </Link>
            {
                isAuth?
                <Link to={'/perfil'}><SignOrProfile>Perfil</SignOrProfile></Link> :
                <Link to={'/login'}><SignOrProfile>Sign in</SignOrProfile></Link>
            }
        </Nav>
    )
};

export default Navbar;