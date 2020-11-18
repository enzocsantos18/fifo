import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 140px;
    height: 140px;
    border: 3px solid rgba(98, 103, 112, 0.15);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-bottom: 10px;
`;

export const Container = styled.div`
    width: 120px;
    height: 120px;
    border: 3px solid var(--text0);
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;

    & p {
        font-size: 14px;
        color: var(--text0);
    }

    & img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 50%;
    }

    box-shadow: 1px 1px 4px var(--text0);

    & p {
        text-align: center;
    }
`;

export const CameraButton = styled.div`
    width: 40px;
    height: 40px;
    border: 3px solid var(--text0);
    border-radius: 50%;
    position: absolute;
    right: -15px;
    top: 0px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
`;
