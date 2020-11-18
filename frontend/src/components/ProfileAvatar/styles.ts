import styled from 'styled-components';

export const Container = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary0);
    border: 3px solid var(--primary2);

    & img {
        display: inline;
        margin: 0 auto;
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 50%;
    }
`;
