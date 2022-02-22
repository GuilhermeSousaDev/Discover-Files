import React, { 
    ChangeEvent, 
    FC, 
    useCallback, 
    useState, 
    useEffect, 
    useContext 
} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../services/Context';
import { 
    Container,
    Button, 
    ButtonContainer, 
    ForgotPassword, 
    InputContainer, 
    MainContainer, 
    Logo,
    Input,
} from './style';
import api from '../../services/Axios';

interface IForm {
    [key: string]: string;
}

interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IResponse {
    user: IUser;
    token: string;
}

export const Login: FC = () => {
    const { isAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(isAuth) {
            navigate('/');
        }
    }, [isAuth, navigate]);

    const [form, setForm] = useState<IForm>();

    const changeData = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }, [form]);

    const handleSubmit = useCallback(async () => {
        if(form) {
            const { data } = await api.post<IResponse>('/login', form);

            console.log(data);

            if(data.token) {
                localStorage.setItem('token', data.token);
                navigate('/');
            }
        }
        
    }, [form, navigate]);

    return (
        <Container>
            <MainContainer>
                <Logo>DropFile - Login</Logo>
                <br />
                <InputContainer>
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
                <ButtonContainer>
                    <Button onClick={handleSubmit}>Sign In</Button>
                </ButtonContainer>
                <ButtonContainer>
                    <Button onClick={() => navigate('/register')}>
                        Register
                    </Button>
                </ButtonContainer>
                <ForgotPassword>Forgot Password ?</ForgotPassword>
            </MainContainer>
        </Container>
    );
}

