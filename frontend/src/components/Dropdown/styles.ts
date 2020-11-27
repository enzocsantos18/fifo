import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled.div`
    position: relative;
`;

export const Container = styled(motion.div)`
    position: absolute;
    background: #fff;
    border-radius: 8px;
    right: 0;
    top: 0;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const Item = styled.div`
    color: var(--text0);
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0 5px;
    padding: 10px 20px;
    border-radius: 8px;

    &:hover {
        background: var(--light1);
    }

    & svg {
        color: var(--text0) !important;
        margin-right: 10px;
        pointer-events: none;
    }

    &:hover {
        color: var(--text1);
    }

    & a {
        text-decoration: none;
        width: 80%;
        height: 100%;
        color: var(--text0);
    }

    & a:active, & a:visited {
        color: var(--text1);
    }
`;
