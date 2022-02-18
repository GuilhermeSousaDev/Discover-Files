import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background: linear-gradient(to right, #1a3365 0%, #ff4343 79%);
    }

    #root {
        max-width: 1120px;
        margin: 0 auto;
    }
`;