import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    input {
        margin-top: 2rem;
        padding: 5px;
        border-radius: 10px;
        text-align: center;
        font-family: 'IBM Plex Sans', sans-serif;
        width: 200px;
        &focus {
            border: 5px solid #1a3365;
        }
    }
`;

export const UlContainer = styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
`;