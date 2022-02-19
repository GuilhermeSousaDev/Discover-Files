import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/Axios';
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
    const navigate = useNavigate();
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
                <Logo>Discover - Login</Logo>
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
                    <Button onClick={handleSubmit}>Sign Up</Button>
                </ButtonContainer>
                <ForgotPassword>Forgot Password ?</ForgotPassword>
            </MainContainer>
        </Container>
    );
}

