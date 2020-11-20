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
`;

export const RightContainer = styled(Container)`
    width: 400px;
    margin-left: 20px;
`;

export const Actions = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 30px;

    & button {
        width: 48%;
    }
`;
