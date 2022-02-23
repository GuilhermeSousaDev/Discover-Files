import styled from 'styled-components';

export const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #212529;
    padding: 20px;
    a {
        text-decoration: none;
        color: #212529;
    }
    button:hover {
        background: #1a3365;
        color: #fff;
    }
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
    color: #212529;
    background-color: #f8f9fa;
    border-color: #212529;
    font-family: 'Montserrat', sans-serif;
    cursor: pointer;
`;

export const Title = styled.p`
    font-size: 25px;
    font-family: 'IBM Plex Sans', sans-serif;
`;

export const Sign = styled.p`
    font-family: 'Roboto Condensed', sans-serif;    
    font-size: 15px;
    color: #007bff;
`;