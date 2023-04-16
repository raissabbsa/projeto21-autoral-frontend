import styled from "styled-components"

export default function ShowTests({ test }) {
    return (
        <Container>
            <h1>{test.name}</h1>
            <h4>Data: {test.date}</h4>
            <h4>{test.grade}</h4>

        </Container>
    )
}

const Container = styled.div`
    width: 200px;
    height: 70px;
    background-color: #20B2AA;
    border: 1px solid #cecece;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-right: 10px;
    &>h1{
        font-size: 16px;
        color: black;
    }
    &>h4{
        font-size: 14px;
        color: black;

    }
`;