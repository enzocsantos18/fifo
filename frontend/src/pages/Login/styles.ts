import styled from 'styled-components';
import device from './../../util/device';

export const Wrapper = styled.div`
    height: calc(100vh - 70px);
    display: flex;
    justify-content: center;
    align-items: center;

    
`;

export const Container = styled.div`
    width: 400px;
    padding: 30px 40px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);

    & h1 {
        margin-bottom: 20px;
    }

    & h2 {
        font-size: 18px;
        font-weight: 500;
    }

    & a {
        font-size: 12px;
        margin-bottom: 10px;
        color: var(--text0);
        transition: all 0.2s ease;
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

    @media ${device.mobile} {
        box-shadow: none;
        padding: 10px 20px;
    }
`;
