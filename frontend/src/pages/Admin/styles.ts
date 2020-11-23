import styled, { css } from 'styled-components';

export const Container = styled.div`
    border-radius: 8px;
    margin: auto;
    margin-top: 120px;
    width: 760px;
    display: flex;
`;

export const Tab = styled.div`
    width: 200px;
    padding-top: 50px;
`;

interface ITabItemProps {
    selected?: boolean;
}

export const TabItem = styled.div<ITabItemProps>`
    width: 100%;
    background: #fff;
    border-radius: 16px;
    padding: 10px 20px;
    color: var(--text0);
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
    cursor: pointer;

    & svg {
        margin-right: 10px;
    }

    ${p =>
        p.selected
            ? css`
                  background: var(--secondary1);
                  color: #fff;

                  & svg {
                      color: #fff;
                  }
              `
            : css`
                  &:hover {
                      background: var(--light2);
                  }
              `}
`;

export const Content = styled.div`
    background: #fff;
    border-radius: 16px;
    padding: 20px 30px;
    color: var(--text0);
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
    margin-left: 20px;
    width: 100%;
`;
