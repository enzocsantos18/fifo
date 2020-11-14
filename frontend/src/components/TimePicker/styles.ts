import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    & button {
        width: 46px;
    }
`;

export const TimeInput = styled.div`
    width: 55px;
    height: 40px;
    border-radius: 8px;
    border: 5px solid var(--light1);
    font-size: 18px;
    color: #000;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
`;

export const Separator = styled.span`
    font-size: 18px;
    color: #000;
    font-weight: bold;
`;
