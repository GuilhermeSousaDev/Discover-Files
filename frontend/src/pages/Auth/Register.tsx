import React, { FC } from 'react';
import { 
    Button, 
    ButtonContainer, 
    ForgotPassword, 
    InputContainer, 
    MainContainer, 
    Logo,
    Input,
} from './style';

export const Register: FC = () => {
    return (
        <MainContainer>
            <Logo>Discover</Logo>
            <InputContainer>
                <Input type="text" placeholder="Email" />
                <Input type="password" placeholder="Password" />
            </InputContainer>
            <ButtonContainer>
                <Button>Sign Up</Button>
            </ButtonContainer>
            <ForgotPassword>Forgot Password ?</ForgotPassword>
        </MainContainer>
    );
}

