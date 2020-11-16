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
    top: 20px;
    padding: 10px 20px;
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
    justify-content: space-between;
    align-items: center;

    & svg {
        color: var(--text0);
        margin-right: 10px;
    }

    &:hover {
        color: var(--text1);
    }
`;
