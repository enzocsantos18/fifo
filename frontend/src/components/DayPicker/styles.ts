import styled, { css } from 'styled-components';


export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
    display: flex;
    border-radius: 8px;
    background: var(--primary1);
    padding: 10px 20px;
    justify-content: space-between;
    align-items: center;
    width: 400px;
`;

interface IDayPickProps {
    disabled: boolean;
    selected: boolean;
}

export const DayPick = styled.div<IDayPickProps>`
    display: flex;
    flex-direction: column;
    color: var(--text0);
    align-items: center;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 16px;
    padding: 10px;

    &:hover {
        background: var(--primary2);
    }

    & span {
        color: #fff;
    }

    ${p =>
        p.disabled &&
        css`
            cursor: not-allowed;

            & ${DayCircle} {
                background: var(--primary2);
                color: #000;
            }
        `}

    ${p =>
        p.selected &&
        css`
            cursor: initial;
            background: var(--primary2);

            & ${DayCircle} {
                color: #000;
                background: var(--primary0);
            }
        `}
`;

export const DayCircle = styled.div`
    background: #fff;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    transition: all .2s ease;
`;
