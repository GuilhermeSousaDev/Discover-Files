import React, { 
    ChangeEvent, 
    FC, 
    useCallback, 
    useState, 
    useEffect, 
    useContext,
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
import { IUser } from '../../interfaces/IUser';

interface IForm {
    [key: string]: string;
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

    const handleSign = useCallback(async () => {
        if(form) {
            const { data } = await api.post<IResponse>('/login', form);

            if(data.token) {
                localStorage.setItem('token', data.token);
                navigate('/');
                // eslint-disable-next-line no-restricted-globals
                location.reload();
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
                    <Button onClick={handleSign}>Sign In</Button>
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

