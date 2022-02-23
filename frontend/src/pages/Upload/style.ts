import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 600px;
    input {
        display: none;
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