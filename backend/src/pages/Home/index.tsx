import React, { FC, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../services/Context';
import { 
    Button, 
    Container,
    Text, 
    Left, 
    ButtonContainer,
    Right,
} from './style';
import { FcUpload } from 'react-icons/fc';
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
            <Container>
                <Left>
                    <Text>
                        Find or Post any type of file
                    </Text>
                    <ButtonContainer>
                        <Link to={'/files'}>
                            <Button 
                                theme={'#1a3365'}
                                color={'#f8f9fa'}
                            >
                                Find Files
                            </Button>
                        </Link>
                        <Link to={'/upload'}>
                            <Button 
                                theme={'#f8f9fa'}
                                color={'#212529'}
                            >
                                Upload Files
                            </Button>
                        </Link>
                    </ButtonContainer>
                </Left>
                <Right>
                    <FcUpload />
                </Right>
            </Container>
        </>
    );
};

export default Home;