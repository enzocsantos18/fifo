import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    html, body, #root {
        margin: 0;
        padding: 0;
        -webkit-font-aliasing: smoothed;
    }

    * {
        box-sizing: border-box;
    }
`;
