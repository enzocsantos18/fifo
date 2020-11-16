import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Container = styled.div`
    width: 400px;
    padding: 30px 40px;
    background: #fff;
    border-radius: 16px;

    & h1 {
        margin-bottom: 0;
    }

    & h2 {
        font-size: 18px;
        font-weight: 500;
    }

    & a {
        font-size: 12px;
        margin-bottom: 10px;
        color: var(--text0);
        transition: all .2s ease;
        cursor: pointer;
        text-decoration: none;
    }

    .right {
        float: right;
    }

    .center {
        text-align: center;
    }

    & a:hover {
        color: var(--text1);
        text-decoration: underline;
    }
`;
