import styled from 'styled-components';

export const Container = styled.div`
    width: 1200px;
    border-radius: 8px;
    margin: auto;
    margin-top: 100px;

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
`;

export const DaySchedules = styled.div`
    margin-right: 20px;
    width: 380px;
    min-height: 200px;
    background: #fff;
    padding: 20px 30px;
    border-radius: 16px;
    margin-bottom: 20px;

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

export const ScheduleJoint = styled.div`
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    position: relative;
`;

export const Schedule = styled.div`
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--primary1);
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 10px;

    &:not(:last-child) {
        & ${ScheduleJoint}:before {
            position: absolute;
            content: '';
            height: 48px;
            width: 2px;
            background: rgba(255, 255, 255, 0.67);
            left: 7px;
            top: 16px;
        }
    }
`;

export const ScheduleTime = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    & span {
        color: #fff;
        font-size: 18px;
        font-weight: 700;
        margin-right: 20px;
    }
`;

export const ScheduleInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    & span {
        color: #fff;
    }

    & span:first-child {
        font-size: 14px;
        font-weight: 700;
    }

    & span:nth-child(2) {
        font-size: 12px;
        font-weight: 500;
    }

    margin-right: 10px;
`;

export const ScheduleDetails = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 30px;

    & svg {
        color: #fff;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    & svg:hover {
        background: var(--primary2);
        border-radius: 8px;
    }
`;
