import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { BASE_URL } from "../../../constants/urls";
import { TokenContext } from "../../../contexts/TokenContext";
import ActivityList from "./ActivictyList";

export default function WeekDay({ day, id }) {
  const [activity, setActivity] = useState();
  const [newActivity, setNewAtivity] = useState(1);
  const [activitiesList, setActivitiesList] = useState([]);
  const { userData } = useContext(TokenContext);
  const config = { headers: { Authorization: `Bearer ${userData.token}` } };

  function sendActivity(){
    const form = {
        name: activity,
        weekdayId: id
      };
      const promise = axios.post(`${BASE_URL}/task`, form, config);
      promise.then(() => {
        setNewAtivity(newActivity+1);
        setActivity("");
      });
      promise.catch((err) => {
        console.log(err);
        alert(err.response.data);
      });
  }

  useEffect(() => {
    const promise = axios.get(`${BASE_URL}/task/${id}`, config);
    promise.then((res) => {
      setActivitiesList(res.data);
    });
    promise.catch((err) => {
      console.log(err);
      alert(err.response.data);
    });
  }, [newActivity]);

  return (
    <DayContainer>
      <h1>{day}</h1>
      <NewActivity>
        <input
          name="activity"
          placeholder="Adicionar atividade"
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
        <button onClick={() => sendActivity()}>Enviar</button>
      </NewActivity>
      {activitiesList.map(activity => <ActivityList key={activity.id} activity={activity}/>)}
    </DayContainer>
  );
}

const NewActivity = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  & > input {
    height: 25px;
    width: 180px;
    margin-bottom: 10px;
    background-color: #ffffff;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    font-size: 14px;
    padding-left: 10px;
  }
  & > button {
    background-color: #3E8C8C;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    height: 30px;
    width: 70px;
    cursor: pointer;
  }
`;

const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #cecece;
  background-color: #F7F8F9;
  padding: 10px;
  border-radius: 20px;
  margin-right: 10px;
  width: 200px;
  height: 500px;
  padding: 20px;
  h1 {
    margin-bottom: 20px;
  }
`;
