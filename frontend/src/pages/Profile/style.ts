import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
        font-family: 'IBM Plex Sans', sans-serif;
    }
    img { 
        cursor: pointer;
        margin-bottom: 1rem;
    }
`;

export const UlContainer = styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
`;

export const NameProfile = styled.h2`
    font-family: 'IBM Plex Sans', sans-serif;
`;

export const Title = styled.h1`
    margin-top: 1rem;
    font-family: 'IBM Plex Sans', sans-serif;
`;

export const Button = styled.button`
    background: linear-gradient(to right, #14163c 0%, #03217b 79%);
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    width: 100px;
    height: 3rem;
    border: none;
    color: white;
    border-radius: 2rem;
    margin-top: 2rem;
    cursor: pointer;
`;