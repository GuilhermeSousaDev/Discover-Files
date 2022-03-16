import React, {
  ChangeEvent,
  FC,
  useCallback,
  useContext,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../services/Axios";
import { AuthContext } from "../../services/Context";
import {
  Button,
  Container,
  Input,
  InputContainer,
  Logo,
  MainContainer,
  Response,
} from "./style";

interface IForm {
  [key: string]: string;
}

const EditProfile: FC = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState<IForm>();
  const [error, setError] = useState<string>();

  const changeData = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    },
    [form]
  );

  const handleSubmit = useCallback(async () => {
    if(form) {
      const { data } = await api.put("/user", form, {
        headers: {
          Authorization: token as string,
        },
      });
  
      if(data.id) {
        navigate('/profile');
      } else {
        setError(data);
      }
    } else {
      setError('Preencha todos os campos!')
    }
  }, [form, token, navigate]);

  return (
    <>
      <Navbar />
      <Container>
        <MainContainer>
          <Logo>Edit Profile</Logo>
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
              name="old_password"
              placeholder="old_password"
              onChange={changeData}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={changeData}
            />
            <Input
              type="password"
              name="password_confirmation"
              placeholder="Password_Confirmation"
              onChange={changeData}
            />
            <br />
            <Button onClick={handleSubmit}>Edit Profile</Button>
          </InputContainer>
          <br />
          {error ? <Response color={"#ff4343"}>{error}</Response> : ""}
        </MainContainer>
      </Container>
    </>
  );
};

export default EditProfile;
