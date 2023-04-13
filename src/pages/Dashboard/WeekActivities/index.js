import styled from "styled-components";
import { Background } from "../../../components/Background";
import Menu from "../../../components/Menu";
import WeekDay from "./Day";

export default function WeekActivities() {
  const weekDays = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
  return (
    <Background>
      <Container>
        <Menu />
        <ActivitiesContainer>
          <h1>Atividades</h1>
          <div>
            {weekDays.map((day, i) => (
              <WeekDay key={i} day={day} id={i + 1} />
            ))}
          </div>
        </ActivitiesContainer>
      </Container>
    </Background>
  );
}

const ActivitiesContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  &>div{
    display: flex;
  }
  &>h1{
    font-size: 25px;
    margin-bottom: 20px;
  }
`;

const Container = styled.div`
  background-color: #ffffff;
  width: 1200px;
  height: 600px;
  border: none;
  border-radius: 10px;
  display: flex;
  margin: 0 auto;
`
