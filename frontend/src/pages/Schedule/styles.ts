import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 200px;
`;

export const Container = styled(motion.div)`
    background: #fff;
    border-radius: 8px;
    padding: 30px 40px;

    & form {
        display: flex;
        flex-direction: column;

        & label {
            margin-top: 20px;
        }
    }

    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
`;

export const RightContainer = styled(Container)`
    width: 400px;
    margin-left: 20px;
    overflow-y: auto;

    & p {
        text-align: center;
        color: var(--text0);
        font-size: 14px;
    }
`;

export const LoadingContainer = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Actions = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 30px;

    & button {
        width: 48%;
    }
`;

export const ScheduleError = styled.div`
    text-align: center;
    margin-bottom: 20px;
`;
