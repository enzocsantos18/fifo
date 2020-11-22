import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ScheduleJoint = styled.div`
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    position: relative;
`;

export const Container = styled(motion.div)`
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

export const ShimmerContainer = styled.div`
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 10px;
    background: #efefef;

    & span {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export const ScheduleTime = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ScheduleHorary = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    & span {
        color: #fff;
        font-size: 16px;
        font-weight: 700;
        margin-right: 20px;
    }

    & span:last-child {
        font-size: 12px;
        font-weight: 500;
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

export const ScheduleUserInfo = styled.div`
    display: flex;
    align-items: center;

    & span {
        color: #fff;
        font-weight: 500;
        font-size: 14px;
        margin-right: 10px;
    }
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
