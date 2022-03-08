import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 3px dashed #03217b;
    width: 300px;
    height: 200px;
    background: ${(props) => props.color};
    span {
        font-family: 'IBM Plex Sans', sans-serif;
    }
`;

export const Button = styled.button`
    background: #28a745;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    width: 200px;
    height: 3rem;
    border: none;
    color: white;
    border-radius: 2rem;
    margin-top: 2rem;
    cursor: pointer;
    &:hover {
        border: 3px solid green;
    }
`;