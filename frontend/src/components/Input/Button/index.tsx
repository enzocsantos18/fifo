import styled, { css } from 'styled-components';

type Variant = 'primary' | 'secondary' | 'light' | undefined;

interface IProps {
    variant?: Variant;
}

const Button = styled.button<IProps>`
    height: 40px;
    font-weight: 700;
    color: #fff;
    transition: all 0.2s ease;
    border: none;
    border-radius: 8px;
    width: 100%;
    cursor: pointer;
    background: var(--primary1);
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: var(--primary2);
    }

    & svg {
        color: #fff;
        font-size: 24px;
        margin: 0 5px;
    }

    ${p =>
        p.variant == 'secondary' &&
        css`
            background: var(--secondary1);

            &:hover {
                background: var(--secondary2);
            }
        `}

    ${p =>
        p.variant == 'light' &&
        css`
            background: var(--light1);
            color: var(--text0);

            &:hover {
                background: var(--light2);
            }
        `}
`;

export default Button;
