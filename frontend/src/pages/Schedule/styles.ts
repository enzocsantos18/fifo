import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
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
`;

export const Actions = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 30px;

    & button {
        width: 48%;
    }
`;
