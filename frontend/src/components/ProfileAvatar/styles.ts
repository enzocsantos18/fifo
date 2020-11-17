import styled from 'styled-components';

export const Container = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary0);

    & img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 3px solid var(--primary2);
    }
`;
