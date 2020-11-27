import styled, { css } from 'styled-components';

export const Container = styled.div``;

export const Table = styled.table`
    width: 100%;
    color: var(--text0);

    font-size: 14px;
    font-weight: 500;

    & thead {
        font-weight: 700;
        text-align: center;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
    }

    & th {
        padding: 10px 20px;
    }

    & td {
        padding-top: 20px;
        text-align: center;
    }

    & svg {
        cursor: pointer;
        transition: all 0.2s ease;
    }

    & svg:hover {
        color: var(--text1);
    }

    margin-bottom: 30px;
`;

export const ModalBody = styled.div`
    & p {
        font-size: 14px;
        font-weight: 700;
        color: var(--text1);
    }
`;

export const StationList = styled.div`
    margin: 20px 0;
`;

export const StationItem = styled.div`
    font-size: 14px;
    color: var(--text0);
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10px;
`;

interface IStationItemCheckProps {
    selected?: boolean;
}

export const StationItemCheck = styled.div<IStationItemCheckProps>`
    border: 3px solid var(--text1);
    border-radius: 8px;
    width: 25px;
    height: 25px;
    margin-right: 10px;
    padding: 5px;
    transition: all 0.2s ease;

    ${p =>
        p.selected &&
        css`
            background: var(--text0);
            border-color: var(--text1);
        `}
`;

export const ModalActions = styled.div`
    display: flex;
    justify-content: center;
    & button {
        width: 48%;
    }
`;
