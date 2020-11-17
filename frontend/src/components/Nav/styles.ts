import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 70px;

    background: #fff;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
    position: fixed;
    left: 0;
    top: 0;
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

export const LinkItem = styled.a`
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
    transition: all .2s ease;

    &:hover {
        background: var(--primary2);
    }

    & div {
        display: flex;
        align-items: center;
    }

    & span{
        color: #fff;
        font-weight: 500;
    }

    & svg {
        color: #fff;
        margin-left: 10px;  
    }
`;

export const ProfileAvatar = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #c4c4c4;
`;
