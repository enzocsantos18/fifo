import styled from 'styled-components';

export const Container = styled.div`
    border-radius: 50%;
    background: var(--primary1);
    display: flex;
    justify-content: center;
    align-items: center;

    & img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 50%;
    }

    & p {
        font-size: 12px;
        font-weight: 700;
        color: #fff;
    }
`;
