import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 600px;
    img {
        margin-bottom: 1rem;
        max-width: 200px;
        max-height: 200px;
    }
`;

export const Text = styled.span`
    font-family: 'IBM Plex Sans', sans-serif;
    margin-bottom: 1rem;
`;

export const UploadContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 2px dashed #1a3365;
    background: ${(props) => props.color};
    width: 400px;
    height: 400px;
    margin-bottom: 1rem;
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
    &:hover {
        background: #1a3365;
        color: #fff;
    }
`;