import styled, { css } from 'styled-components';

type Variant = 'danger' | 'success' | 'warning' | undefined;


interface IWrapperProps {
    hasIcon: boolean;
    variant: Variant;
}

export const Wrapper = styled.div<IWrapperProps>`
    position: relative;

    ${p =>
        p.hasIcon &&
        css`
            & input {
                padding-right: 60px;
            }
        `}

    & input {
        width: 100%;
    }

    & span {
        position: absolute;
        top: 10px;
        right: 20px;
    }

    ${p => p.variant === 'danger' && css`
        & input {
            border-color: var(--red1);
        }

        & input:focus {
            border-color: var(--red1);
        }

        & svg {
            color: var(--red1);
        }
    `}
`;
