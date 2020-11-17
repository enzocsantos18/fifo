import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    
    html, body, #root {
        margin: 0;
        padding: 0;
        font-family: 'Open Sans', 'Helvetica', sans-serif;
        background: #f2f2f2;
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
        --light2: #e4e4e4;
        --red1: #FF9999;
        --shimmer0: #F8F9FB;
        --shimmer1: #fff;
    }

    label {
        font-size: 18px;
        color: var(--text0);
        margin: 10px 0;
        font-weight: 700;
        margin-left: 5px;
        margin-top: 20px;
    }

    input {
        border: 2px solid var(--light1);
        border-radius: 8px;
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

    h1, h2, h3 {
        color: var(--text0);
    }

    h1 {
        font-size: 32px;
    }

    .error {
        font-size: 14px;
        color: var(--red1);
        margin-left: 5px;
        margin-top: 5px;
    }

    @keyframes shimmer {
        0% {
            background-position: -468px 0;
        }
        
        100% {
            background-position: 468px 0; 
        }
    }   

`;
