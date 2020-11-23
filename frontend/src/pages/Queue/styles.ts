import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Container = styled.div`
    background: #fff;
    border-radius: 8px;
    padding: 30px 40px;
    width: 780px;

    & form {
        display: flex;
        flex-direction: column;

        & label {
            margin-top: 20px;
        }
    }

    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
`;

export const QueueList = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-left: -10px;
    margin-right: -10px;
    min-height: 120px;

    & h2 {
        margin-left: 10px;
    }
`;

export const QueueItem = styled.div`
    width: 220px;
    height: 100px;
    border: 3px solid var(--light1);
    border-radius: 8px;
    margin: 0 10px;
    margin-bottom: 20px;
    position: relative;
    padding: 5px 20px 10px 30px;

    &::before {
        content: '';
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        background: var(--primary1);
        width: 6px;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
`;

export const QueueItemShimmerContainer = styled.div`
    width: 220px;
    height: 100px;
    border: 2px solid var(--light1);
    border-radius: 8px;
    margin: 0 10px;
    margin-bottom: 20px;
    padding: 5px 20px 10px 30px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

export const QueueProfile = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    & span {
        font-size: 14px;
        color: var(--text0);
        font-weight: 700;
    }
`;

export const QueueGame = styled.div`
    font-size: 12px;
    color: var(--text0);
    font-weight: 500;
`;

export const QueueDetails = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 3px;
    padding-right: 10px;

    & span {
        font-size: 12px;
        color: var(--text0);
        font-weight: 500;
    }
`;

export const QueueStatus = styled.div`
    display: flex;
    align-items: center;

    & span {
        margin-left: 5px;
        font-weight: 700;
        color: #000;
        font-size: 10px;
    }
`;

export const QueueStatusCircle = styled.div`
    width: 18px;
    height: 18px;
    background: #ff0000;
    border: 3px solid #000;
    border-radius: 50%;
`;

export const Actions = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 50px;

    & button {
        width: 48%;
    }
`;
