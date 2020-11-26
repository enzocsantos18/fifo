import styled from 'styled-components';

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

export const ModalActions = styled.div`
    display: flex;
    justify-content: center;
    & button {
        width: 48%;
    }
`;
