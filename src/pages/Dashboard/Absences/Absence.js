import styled from "styled-components";
import { BsPlusSquareFill } from "react-icons/bs";
import { useState, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../../../constants/urls";
import { TokenContext } from "../../../contexts/TokenContext";
import { useEffect } from "react";

export default function Absence({ subject }) {
  const [add, setAdd] = useState(false);
  const [absence, setAbsence] = useState(false);
  const [totalAbsences, setTotalAbsences] = useState();
  const { userData } = useContext(TokenContext);
  const config = { headers: { Authorization: `Bearer ${userData.token}` } };

  function sendAbsence(){
    const form = {
        amount: Number(absence),
        subjectId: subject.id,
      };
      const promise = axios.post(`${BASE_URL}/absences`, form, config);
      promise.then(() => {
        setAdd(false);
        setAbsence("");
        window.location.reload(false);
      });
      promise.catch((err) => {
        console.log(err);
        alert(err.response.data);
      });
  }
  useEffect(() => {
    const promise = axios.get(`${BASE_URL}/absences/${subject.id}`, config);
    promise.then((res) => {
      let total = 0;
      res.data.map((absence) => total+=absence.amount)
      setTotalAbsences(total);
    });
    promise.catch((err) => {
      console.log(err);
      alert(err.response.data);
    });
  }, []);

  function newAbsenceInfo() {
    if (add) {
      return (
        <Infos>
          <input
            placeholder="Quantidade de faltas"
            type="number"
            value={absence}
            onChange={(e) => setAbsence(e.target.value)}
          />
          <div>
            <button onClick={() => setAdd(false)}>Cancelar</button>
            <button onClick={() => sendAbsence()}>Enviar</button>
          </div>
        </Infos>
      );
    }
  }

  return (
    <AbsenceContainer>
      <h1>{subject.name}</h1>
      <div>
        <p>Adicionar Falta</p>
        <BsPlusSquareFill onClick={() => setAdd(true)} />
      </div>
      {newAbsenceInfo()}
      <h2>Faltas</h2>
      <h3>{totalAbsences}</h3>
    </AbsenceContainer>
  );
}

const AbsenceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  height: 230px;
  width: 250px;
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
  &>h2{
    font-size: 20px;
    margin-top: 30px; 
    color: red;
  
  }
  &>h3{
    font-size: 18px;
    color: red;
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

