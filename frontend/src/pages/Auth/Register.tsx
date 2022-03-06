import React, { 
    ChangeEvent, 
    FC, 
    useCallback, 
    useContext, 
    useEffect, 
    useState,
} from 'react';
import api from '../../services/Axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../services/Context';
import { 
    Button, 
    ButtonContainer, 
    InputContainer, 
    MainContainer, 
    Logo,
    Input,
    Container,
    Response,
} from './style';

interface IForm {
    [key: string]: string;
}

export const Register: FC = () => {
    const navigate = useNavigate();
    const { isAuth } = useContext(AuthContext);

    useEffect(() => {
        if(isAuth) {
            navigate('/');
        }
    }, [isAuth, navigate]);

    const [form, setForm] = useState<IForm>();
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const changeData = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }, [form]);

    const handleSubmit = useCallback(async () => {
        if(form) {
            const { data } = await api.post('/user', form);

            if(data.name) {
                setSuccess('Account created with sucess');
            } else {
                setError(data);
            }
        } else {
            setError('All fields need to be filled');
        }
    }, [form]);

    return (
        <Container>
            <MainContainer>
                <Logo>DropFile - Register</Logo>
                <br />
                <InputContainer>
                    <Input 
                        type="text"
                        name="name"
                        placeholder="Name" 
                        onChange={changeData}
                    />
                    <Input 
                        type="text"
                        name="email"
                        placeholder="Email" 
                        onChange={changeData}
                    />
                    <Input 
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        onChange={changeData}
                    />
                </InputContainer>
                <br />
                <br />
                <ButtonContainer>
                    <Button onClick={handleSubmit}>Create Account</Button>
                </ButtonContainer>
                <ButtonContainer>
                    <Button onClick={() => navigate('/login')}>
                        Login
                    </Button>
                </ButtonContainer>
                {error? 
                    <Response color={'#ff4343'}>{error}</Response>
                    : ''
                }
                {success && !error? 
                    <Response color={'green'}>{success}</Response>
                    : ''
                }
            </MainContainer>
        </Container>
    );
}

