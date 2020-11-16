import styled, { css } from 'styled-components';

type Variant = 'danger' | 'success' | 'warning' | undefined;

interface IWrapperProps {
    hasIcon: boolean;
    variant: Variant;
}

export const Wrapper = styled.div<IWrapperProps>`
    position: relative;
    margin-bottom: 10px;

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
        z-index: 5;
        cursor: pointer;
    }

    & span:hover {
        & svg {
            color: var(--text1);
        }
    }

    ${p =>
        p.variant === 'danger' &&
        css`
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
