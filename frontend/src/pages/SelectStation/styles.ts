import styled from 'styled-components';
import { motion } from 'framer-motion';
import device from './../../util/device';

export const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    @media ${device.mobile} {
        height: calc(100% - 50px);
        margin-top: 50px;
    }

    @media ${device.tablet} {
        height: calc(100% - 50px);
        margin-top: 50px;
    }
`;

export const Container = styled(motion.div)`
    background: #fff;
    border-radius: 8px;
    padding: 30px 40px;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);

    @media ${device.mobile} {
        box-shadow: none;
        padding: 10px 20px;
    }

    @media ${device.tablet} {
        box-shadow: none;
    }
`;

export const StationList = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
`;

export const Station = styled.div`
    width: 160px;
    height: 200px;
    text-align: center;

    color: var(--text0);
    background: var(--light1);
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    transition: all 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 20px;

    & svg {
        margin-bottom: 20px;
    }

    &:hover {
        transform: translateY(-5px);
    }

    @media ${device.mobile} {
        width: 48%;
    }
`;

export const StationShimmerContainer = styled.div`
    width: 160px;
    height: 200px;

    & div {
        margin-bottom: 10px;
    }

    @media ${device.mobile} {
        width: 48%;
    }
`;

export const Actions = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 30px;

    & button {
        width: 100%;
    }
`;
