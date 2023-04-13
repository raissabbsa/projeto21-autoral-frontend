import styled from "styled-components";
import {
  AiOutlineCarryOut,
  AiOutlineCloseSquare,
  AiOutlineCalendar,
  AiOutlineDatabase,
} from "react-icons/ai";
import { BiExit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TokenContext } from "../contexts/TokenContext";

export default function Menu() {
  const navigate = useNavigate();
  const { setUserData } = useContext(TokenContext);

  function handleLogout() {
    localStorage.removeItem("userData");
    setUserData(undefined);
    navigate("/");
  }

  return (
    <LateralMenu>
      <Option onClick={() => navigate("/dashboard/weekActivities")}>
        <AiOutlineCarryOut />
        <p>Atividades</p>
      </Option>
      <Option onClick={() => navigate("/dashboard/subjects")}>
        <AiOutlineDatabase />
        <p>Matérias</p>
      </Option>
      <Option>
        <AiOutlineCloseSquare onClick={() => navigate("/dashboard/absences")} />
        <p>Faltas</p>
      </Option>
      <Option>
        <AiOutlineCalendar onClick={() => navigate("/dashboard/grades")} />
        <p>Provas</p>
      </Option>
      <Option onClick={() => handleLogout()}>
        <BiExit />
        <p>Sair</p>
      </Option>
    </LateralMenu>
  );
}

const LateralMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  padding-top: 30px;
  width: 120px;
  background-color: #dddddd;
  box-sizing: border-box;
  svg {
    font-size: 30px;
    color: #3e8c8c;
    margin-bottom: 5px;
    margin-top: 15px;
  }
`;

const Option = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  cursor: pointer;
`;
