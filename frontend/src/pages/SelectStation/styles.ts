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
    padding: 30px 40px;
`;

export const StationList = styled.div`
    margin-top: 30px;
    display: flex;
`;

export const Station = styled.div`
    width: 160px;
    height: 200px;
    margin-right: 20px;
    text-align: center;

    color: var(--text0);
    background: var(--light1);
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    transition: all 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 20px;

    &:hover {
        transform: translateY(-5px);
    }
`;

export const Actions = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 30px;

    & button {
        width: 48%;
    }
`;
