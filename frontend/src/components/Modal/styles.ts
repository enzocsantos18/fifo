import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled(motion.div)`
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 99;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Container = styled(motion.div)`
    width: 300px;
    background: #fff;
    border-radius: 16px;
    padding: 30px 40px;
    text-align: center;
`;

export const ModalActions = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 30px;

    & button {
        width: 48%;
    }
`;
