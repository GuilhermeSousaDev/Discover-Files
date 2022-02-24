import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Left = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    h2 {
        margin-top: 50%;
        margin-bottom: 50%;
    }
`;

export const Right = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    h2 {
        margin-top: 50%;
        margin-bottom: 50%;
    }
`;

export const Text = styled.h2`
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 25px;
`;

export const Button = styled.button`
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    background-color: ${(props) => props.theme};
    color: ${(props) => props.color};
    border-color: #212529;
    font-family: 'Montserrat', sans-serif;
    cursor: pointer;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;