import styled from 'styled-components';

export const Container = styled.div`
    width: 1200px;
    border-radius: 8px;
    margin: auto;
    margin-top: 200px;

    & h2 {
        font-size: 18px;
        color: var(--text0);
        margin-bottom: 0;
    }

    & small {
        font-size: 12px;
        color: var(--text0);
    }
`;

export const DayList = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-left: -10px;
    margin-right: -10px;
`;

export const DaySchedules = styled.div`
    margin: 0 10px;
    width: 380px;
    min-height: 200px;
    background: #fff;
    padding: 20px 30px;
    border-radius: 16px;
    margin-bottom: 20px;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);

    & p {
        font-size: 12px;
        color: var(--text0);
    }
`;

export const ScheduleList = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;
