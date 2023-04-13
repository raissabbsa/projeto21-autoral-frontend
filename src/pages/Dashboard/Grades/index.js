import styled from "styled-components";
import { Background, Container } from "../../../components/Background";
import Menu from "../../../components/Menu";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../../../constants/urls";
import { TokenContext } from "../../../contexts/TokenContext";
import Grade from "./Grade";

export default function Grades() {
  const { userData } = useContext(TokenContext);
  const config = { headers: { Authorization: `Bearer ${userData.token}` } };
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const promise = axios.get(`${BASE_URL}/subject`, config);
    promise.then((res) => {
      setSubjects(res.data);
    });
    promise.catch((err) => {
      console.log(err);
      alert(err.response.data);
    });
  }, []);

  return (
    <Background>
      <Container>
        <Menu />
        <GradeContainer>
          <h1>Notas</h1>
          <div>
            {subjects.map((subject) => (
              <Grade key={subject.id} subject={subject} />
            ))}
          </div>
        </GradeContainer>
      </Container>
    </Background>
  );
}

const GradeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 600px;
  overflow: auto;
  & > h1 {
    font-size: 30px;
    margin-top: 20px;
  }
  & > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

