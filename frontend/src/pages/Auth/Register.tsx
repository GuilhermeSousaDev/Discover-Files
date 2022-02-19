import React, { 
    ChangeEvent, 
    FC, 
    useCallback, 
    useState,
} from 'react';
import api from '../../services/Axios';
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
    const [form, setForm] = useState<IForm>();
    const [msg, setMsg] = useState<string>('');

    const changeData = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }, [form]);

    const handleSubmit = useCallback(async () => {
        if(form) {
            const { data } = await api.post('/user', form);

            if(data.user) {
                setMsg('Account created with sucess');
            } else {
                // Se user não existir data contém o erro
                setMsg(data);
            }
        }
    }, [form]);

    return (
        <Container>
            <MainContainer>
                <Logo>Discover - Create Account</Logo>
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
                <ButtonContainer>
                    <Button onClick={handleSubmit}>Create Account</Button>
                </ButtonContainer>
                {msg? 
                    <Response>{msg}</Response>
                    : ''
                }
            </MainContainer>
        </Container>
    );
}

