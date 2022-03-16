import React, { 
    FC, 
    useContext, 
    useEffect,
    useState,
    useCallback,
} from 'react';
import Navbar from '../../components/Navbar';
import api from '../../services/Axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../services/Context';
import { 
    Container, 
    Title, 
    Button, 
    NameProfile, 
    UlContainer,
} from './style';
import avatarEmpty from '../../images/avatar_empty.png';
import ModalChangeAvatar from '../../components/Modal/ModalChangeAvatar';
import UserFiles from '../../components/List/userFiles';
import { IUser } from '../../interfaces/IUser';

const Profile: FC = () => {
    const { token, user } = useContext(AuthContext);

    const [data, setData] = useState<IUser>();
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const request = await api.get(`/user/${user?.id}`, {
                headers: {
                    Authorization: token as string,
                }
            });

            if(!data) {
                setData(request.data);
            }
        })();
    }, [data, token, user]);

    const handleShowModal = useCallback(() => {
        showModal === true? 
            setShowModal(false) : setShowModal(true);
    }, [showModal]);

    return (
        <>
            <Navbar />
            <Container>
                {data?
                   <>
                    <Title>Profile</Title>
                    <NameProfile>{data.name}</NameProfile>
                    <br />
                    {data.avatar?
                        <img 
                            style={{
                                width: '150px',
                                height: '150px',
                                borderRadius: '50%',
                                border: '2px solid #000',
                            }}
                            onClick={handleShowModal}
                            src={`http://localhost:8081/avatar/${data.avatar}`} 
                            alt="user_avatar"
                        /> :
                        <img 
                            onClick={handleShowModal}
                            src={avatarEmpty} 
                            alt="avatar_empty" 
                        />
                    } 

                    {showModal?
                        <ModalChangeAvatar /> : ''
                    }
                    <br />
                    <span>{data.email}</span>
                    <Link to={'/profile/edit'}>
                        <Button>Editar</Button>
                    </Link>
                   </> : '...Loading'
                }
                <br />
                <Title>Meus Arquivos</Title>
                <UlContainer>
                    <UserFiles />
                </UlContainer>
            </Container>
        </>         
    )
}

export default Profile;