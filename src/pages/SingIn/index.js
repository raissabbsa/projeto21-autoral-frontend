import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/urls";
import { useContext } from "react";
import { TokenContext } from "../../contexts/TokenContext";

export default function SingIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {setToken, setUserData} = useContext(TokenContext);

  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    setLoading(true);

    const promise = axios.post(`${BASE_URL}/auth/sign-in`, {email, password});
    promise.then((res) => {
      localStorage.setItem("userData", JSON.stringify(res.data));
      setUserData(res.data);
      setToken(res.data.token);
      navigate("/dashboard");

    });
    promise.catch((err) => {
      console.log(err);
      alert(err.response.data)
      setLoading(false);
    });
  }
  return (
    <Container>
      <Inscription>
        <h1>Planner Universitário</h1>
        <h2>Entrar</h2>
        <form onSubmit={submit}>
          <Input
            label="E-mail"
            placeholder="E-mail"
            type="text"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading ? "disabled" : ""}
          />
          <Input
            label="Senha"
            placeholder="Senha"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading ? "disabled" : ""}
          />
          <Button type="submit" color="primary" fullWidth>
            Entrar
          </Button>
        </form>
        <p onClick={() => navigate("/registration")}>Não possui login? Inscreva-se!</p>
      </Inscription>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  background-color: #008B8B;
  width: 100%;
  padding-top: 70px;

`;

const Inscription = styled.div`
  background-color: #ffffff;
  width: 600px;
  height: 450px;
  border: none;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  margin: 0 auto;
  & > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  &>h1{
    font-size: 30px;
    margin-bottom: 30px;
    margin-top: 10px;
  }
  &>h2{
    font-size: 25px;
    margin-bottom: 10px;

  }
  &>p{
    cursor: pointer;
    font-size: 20px;
  }
`;

const Input = styled.input`
  width: 400px;
  height: 60px;
  margin: 0 auto;
  margin-bottom: 10px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  background-color: #ADD8E6	;
`;

const Button = styled.button`
  width: 400px;
  height: 60px;
  margin: 0 auto;
  margin: 15px 0 15px;
  border: none;
  border-radius: 5px;
  background-color: black	;
  color: white;
  cursor: pointer;
  font-size: 20px;
`;
