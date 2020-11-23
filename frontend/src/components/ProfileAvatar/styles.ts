import styled, { css } from 'styled-components';

interface IContainerProps {
    showBorder: boolean;
}

export const Container = styled.div<IContainerProps>`
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

    ${p =>
        p.showBorder &&
        css`
            border: 3px solid var(--primary2);
        `}
`;
