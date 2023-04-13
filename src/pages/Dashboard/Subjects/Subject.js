import styled from "styled-components";

export default function Subject({subject}) {
    return (
        <SubjectContainer>
            <h1>{subject.name}</h1>
            <p>{subject.average}</p>
        </SubjectContainer>
    )
}

const SubjectContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 145px;
    width: 145px;
    border: 1px solid #CECECE;
    border-radius: 20px;
    margin-top: 40px;
    margin-right: 20px;
    &>h1{
        color: #454545;
        text-align: center;
        font-size: 16px;
        margin-bottom: 5px;
    }
    &>p{
        color: #898989;
        font-size: 14px;
    }
`;