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
    width: 900px;
    background: #fff;
    border-radius: 8px;
    padding: 20px 30px;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
`;

export const GameList = styled.div`
    display: flex;
    margin-top: 30px;
    flex-wrap: wrap;
    margin-left: -10px;
    margin-right: -10px;
`;

export const GameBanner = styled.div`
    height: 200px;
    margin: 10px;
    cursor: pointer;
    transition: all 0.2s ease;

    & img {
        height: 200px;
    }

    &:hover {
        transform: translateY(-5px);
    }
`;

export const GameBannerShimmerContainer = styled.div`
    height: 200px;
    margin: 10px;
    width: 150px;
`;
