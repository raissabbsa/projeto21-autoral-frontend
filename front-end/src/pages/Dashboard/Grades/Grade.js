import styled from "styled-components";
import { BsPlusSquareFill } from "react-icons/bs";
import { useState, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../../../constants/urls";
import { TokenContext } from "../../../contexts/TokenContext";
import { useEffect } from "react";
import ShowTests from "./ShowTests";

export default function Grade({ subject }) {
  const [add, setAdd] = useState(false);
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [tests, setTests] = useState([]);
  const { userData } = useContext(TokenContext);
  const config = { headers: { Authorization: `Bearer ${userData.token}` } };

  function sendGrade(){
    const form = {
        name,
        date,
        subjectId: subject.id
      };
      const promise = axios.post(`${BASE_URL}/test`, form, config);
      promise.then(() => {
        setAdd(false);
        setName("");
        setDate("");
        window.location.reload(false);
      });
      promise.catch((err) => {
        console.log(err);
        alert(err.response.data);
      });
  }

  useEffect(() => {
    const promise = axios.get(`${BASE_URL}/test/${subject.id}`, config);
    promise.then((res) => {
      setTests(res.data);
    });
    promise.catch((err) => {
      console.log(err);
      alert(err.response.data);
    });
  }, []);
  function newGrade() {
    if (add) {
      return (
        <Infos>
          <input
            placeholder="Prova"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Data da prova"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <div>
            <button onClick={() => setAdd(false)}>Cancelar</button>
            <button onClick={() => sendGrade()}>Enviar</button>
          </div>
        </Infos>
      );
    }
  }
  return (
    <AbsenceContainer>
      <h1>{subject.name}</h1>
      <div>
        <p>Adicionar Prova</p>
        <BsPlusSquareFill onClick={() => setAdd(true)} />
      </div>
      {newGrade()}
      <h1>Provas</h1>
      <Tests>
        {tests.map(test => <ShowTests key={test.id} test={test}/>)}
      </Tests>
    </AbsenceContainer>
  );
}

const AbsenceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  height: 300px;
  width: 500px;
  border: 1px solid #cecece;
  border-radius: 20px;
  margin-top: 40px;
  margin-right: 20px;
  & > h1 {
    color: #000000;
    text-align: center;
    font-size: 22px;
    margin-bottom: 15px;
  }
  & > p {
    color: #898989;
    font-size: 14px;
  }
  & > div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    p {
      font-size: 16px;
      margin-right: 20px;
      color: #454545;
    }
    svg {
      font-size: 25px;
      cursor: pointer;
    }
  }
  & > h2 {
    font-size: 20px;
    margin-top: 30px;
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
    height: 25px;
    margin-bottom: 10px;
    background-color: #ffffff;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    font-size: 14px;
    padding-left: 10px;
  }

  button {
    height: 20px;
    width: 70px;
    font-size: 14px;
    margin-right: 20px;
    color: #000000;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const Tests = styled.div`
    display: flex;
`;
