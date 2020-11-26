import { Link } from 'react-router-dom';
import styled from 'styled-components';
import device from './../../util/device';

export const Container = styled.div`
    width: 100%;
    height: 70px;

    background: #fff;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
    position: fixed;
    left: 0;
    top: 0;

    @media ${device.mobile} {
        display: none;
    }

    @media ${device.tablet} {
        display: none;
    }
`;

export const Content = styled.div`
    margin: auto;
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
`;

export const LinkList = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const LinkItem = styled(Link)`
    font-size: 18px;
    color: var(--text0);
    font-weight: 700;
    margin-right: 20px;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
        text-decoration: underline;
    }
`;

export const ProfileContainer = styled.div`
    width: 270px;
    background: var(--primary1);
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: var(--primary2);
    }

    & div {
        display: flex;
        align-items: center;
    }

    & span {
        color: #fff;
        font-weight: 500;
    }

    & svg {
        color: #fff;
        margin-left: 10px;
    }
`;

export const ProfileContainerShimmerContainer = styled.div`
    background: var(--primary1);
    width: 270px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;

    & div {
        display: flex;
        align-items: center;

        & div:last-child {
            margin-left: 10px;
        }
    }
`;
