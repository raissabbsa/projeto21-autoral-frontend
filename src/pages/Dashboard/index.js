import styled from "styled-components"
import { Background, Container } from "../../components/Background"
import Menu from "../../components/Menu"

export default function Dashboard() {
    return(
        <Background>
            <Container>
                <Menu />
                <Welcome>
                    <h1>Seja bem vindo ao Planner Universitário</h1>
                    <p>Aqui você poderá organizar a sua rotina de estudos!</p>
                </Welcome>
            </Container>
        </Background>
    )
}

const Welcome = styled.div`
    padding: 30px;
    &>h1{
        width: 500px;
        font-size: 35px;
        color: #000000;
        margin-bottom: 20px;
    }
    &>p{
        font-size: 20px;
        color: #8E8E8E;
    }
`;
