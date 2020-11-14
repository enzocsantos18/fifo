import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Container = styled.div`
    width: 900px;
    background: #fff;
    border-radius: 8px;
    padding: 20px 30px;
`;

export const GameList = styled.div`
    display: flex;
    margin-top: 30px;
`;

export const GameBanner = styled.div`
    height: 200px;
    margin-right: 20px;
    cursor: pointer;
    transition: all 0.2s ease;

    & img {
        height: 200px;
    }

    &:hover {
        transform: translateY(-5px);
    }
`;
