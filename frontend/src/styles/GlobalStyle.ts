import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    
    html, body, #root {
        margin: 0;
        padding: 0;
        font-family: 'Open Sans', 'Helvetica', sans-serif;
    }

    * {
        box-sizing: border-box;
        outline: none;
    }

    :root {
        --primary0: #FA855A;
        --primary1: #FA6027;
        --primary2: #D44A17;
        --secondary0: #6C6EA1;
        --secondary1: #4B4FA1;
        --secondary2: #33377A;
        --text0: #626770;
        --text1: #494D58;
        --light1: #F8F9FB;
        --red1: #FF9999;
    }

    label {
        font-size: 18px;
        color: var(--text0);
        margin: 10px 0;
    }

    input {
        border: 2px solid var(--light1);
        border-radius: 4px;
        height: 28px;
        transition: all .2s ease;
        color: var(--text1);
        height: 40px;
        padding: 0 10px;
        font-size: 14px;
    }

    input:focus {
        border-color: var(--text1);
    }

    input::placeholder {
        color: var(--text1);
    }

    svg {
        color: var(--text0);
    }
`;
