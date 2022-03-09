import React, { 
    FC, 
    useContext, 
    useEffect,
    useState,
    useCallback,
} from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import api from '../../services/Axios';
import { AuthContext } from '../../services/Context';
import { Container, Title, Button, NameProfile } from './style';
import avatarEmpty from '../../images/avatar_empty.png';
import ModalChangeAvatar from '../../components/Modal/ModalChangeAvatar';

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
    const [showModal, setShowModal] = useState<boolean>(false);

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
                    <Button>Editar</Button>
                   </> : '...Loading'
                }
            </Container>
        </>         
    )
}

export default Profile;