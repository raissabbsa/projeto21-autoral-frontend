import styled from "styled-components";
import Subject from "./Subject";

export default function ShowSubjects({subjects}) {
    return(
    <Container>
        <h1>Matérias</h1>
        <div>
            {subjects.map((subject) => <Subject key={subject.id} subject={subject}/>)}

        </div>
    </Container>);
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    &>h1{
        font-size: 30px;
        margin-top: 20px;
    }
    &>div{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
`;