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

    & svg {
        margin: auto;
        width: 100%;
    }

    & h1,
    & h2,
    & h3 {
        text-align: center;
    }
`;

export const Header = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;

    & svg {
        margin: 0;
        width: 24px;
        cursor: pointer;
    }

    & svg:hover {
        color: var(--text1);
    }
`;

export const ModalActions = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 30px;

    & button {
        width: 48%;
    }
`;
