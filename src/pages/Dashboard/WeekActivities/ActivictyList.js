import styled from "styled-components";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { useState, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../../../constants/urls";
import { TokenContext } from "../../../contexts/TokenContext";

export default function ActivityList({ activity }) {
  const [finished, setFinished] = useState(activity.finished);
  const { userData } = useContext(TokenContext);
  const config = { headers: { Authorization: `Bearer ${userData.token}` } };

  function setActivity() {
    const promise = axios.put(`${BASE_URL}/task/finished/${activity.id}`, config);
    promise.then(() => {
      setFinished(true);
    });
    promise.catch((err) => {
      console.log(err);
      alert(err.response.data);
    });
  }
  return (
    <Container finished={finished}>
      <h5>{activity.name}</h5>
      <AiOutlineCheckSquare onClick={() => setActivity()} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 170px;
  height: 20px;
  padding: 20px;
  border: 1px solid #dddddd;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 10px;
  & > h5 {
    text-align: center;
  }
  & > svg {
    font-size: 25px;
    cursor: pointer;
    color: ${(props) => (props.finished ? "green" : "")};
  }
`;
