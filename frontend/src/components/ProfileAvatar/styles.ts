import styled from 'styled-components';

export const Container = styled.div`
    border-radius: 50%;
    background: var(--primary0);
    border: 3px solid var(--primary2);
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
        font-size: 18px;
        font-weight: 700;
        color: #fff;
    }
`;
