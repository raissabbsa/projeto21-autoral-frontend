import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/urls";

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      alert('As senhas devem ser iguais!');
      setLoading(false);
      return ;
    }
    const body = {name, email, password};
    const promise = axios.post(`${BASE_URL}/users`, body);
    promise.then(() => {
      navigate("/");
    });
    promise.catch((err) => {
      console.log(err);
      alert(err.response.data)
      setLoading(false);
    })
  }
  return (
    <Container>
      <Inscription>
        <h1>Planner Universitário</h1>
        <h2>Inscrição</h2>
        <form onSubmit={submit}>
        <Input
            label="Nome"
            placeholder="Nome"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading ? "disabled" : ""}
          />
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
          <Input
            label="Repita sua senha"
            placeholder="Repita a sua senha"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading ? "disabled" : ""}
          />

          <Button type="submit" color="primary" fullWidth>
            Inscrever
          </Button>
        </form>
        <p onClick={() => navigate("/")} >Já está inscrito? faça o login!</p>
      </Inscription>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  background-color: #008b8b;
  width: 100%;
  padding: 20px 0 20px;
`;

const Inscription = styled.div`
  background-color: #ffffff;
  width: 600px;
  height: 600px;
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
  & > h1 {
    font-size: 30px;
    margin-bottom: 50px;
    margin-top: 10px;
  }
  & > h2 {
    font-size: 25px;
    margin-bottom: 10px;
  }
  & > p {
    cursor: pointer;
    font-size: 20px;
  }
`;

const Input = styled.input`
  width: 400px;
  height: 60px;
  margin: 0 auto;
  margin-bottom: 15px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  background-color: #add8e6;
`;

const Button = styled.button`
  width: 400px;
  height: 60px;
  margin: 0 auto;
  margin: 15px 0 15px;
  border: none;
  border-radius: 5px;
  background-color: black;
  color: white;
  cursor: pointer;
  font-size: 20px;
`;
