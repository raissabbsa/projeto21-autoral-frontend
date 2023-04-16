import styled from "styled-components";
import { Background, Container } from "../../../components/Background";
import Menu from "../../../components/Menu";
import { BsPlusSquareFill } from "react-icons/bs";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../../../constants/urls";
import { TokenContext } from "../../../contexts/TokenContext";
import ShowSubjects from "./ShowSubjects";

export default function Subjects() {
  const [add, setAdd] = useState(false);
  const [name, setName] = useState("");
  const [average, setAverage] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewsubject] = useState(1);
  const { userData } = useContext(TokenContext);
  const config = { headers: { Authorization: `Bearer ${userData.token}` } };

  function sendSubject() {
    if (average < 0 || average > 10) {
      alert("A média deve estar entre 0 e 10");
      return "";
    }
    const form = {
        name,
        average: Number(average),
      };
    const promise = axios.post(`${BASE_URL}/subject`, form, config);
    promise.then(() => {
      setAdd(false);
      setNewsubject(newSubject + 1);
    });
    promise.catch((err) => {
      console.log(err);
      alert(err.response.data);
    });
  }

  useEffect(() => {
    const promise = axios.get(`${BASE_URL}/subject`, config);
    promise.then((res) => {
      setSubjects(res.data);
    });
    promise.catch((err) => {
      console.log(err);
      alert(err.response.data);
    });
  }, [newSubject]);

  function newSubjectInfo() {
    if (add) {
      return (
        <Infos>
          <input
            placeholder="Nome da matéria"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Média da matéria"
            type="number"
            value={average}
            onChange={(e) => setAverage(e.target.value)}
          />
          <div>
            <button onClick={() => setAdd(false)}>Cancelar</button>
            <button onClick={() => sendSubject()}>Enviar</button>
          </div>
        </Infos>
      );
    }
    return <></>;
  }
  return (
    <Background>
      <Container>
        <Menu />
        <SubjectContainer>
          <AddSubject>
            <div>
              <p>Adicionar Matéria</p>
              <BsPlusSquareFill onClick={() => setAdd(true)} />
            </div>
            {newSubjectInfo()}
          </AddSubject>
          <ShowSubjects subjects={subjects}/>
        </SubjectContainer>
      </Container>
    </Background>
  );
}

const SubjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 600px;
  overflow: auto;
`;

const AddSubject = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    display: flex;
    margin-bottom: 20px;
    p {
      font-size: 30px;
      margin-right: 20px;
    }
    svg {
      font-size: 30px;
      cursor: pointer;
    }
  }
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & > input {
    height: 45px;
    margin-bottom: 10px;
    background-color: #ffffff;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    font-size: 20px;
    padding-left: 10px;
  }

  button {
    height: 35px;
    width: 84px;
    font-size: 16px;
    margin-right: 20px;
    color: #000000;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;
