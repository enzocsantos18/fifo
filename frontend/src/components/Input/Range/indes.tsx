import styled from 'styled-components';

export const RangeInput = styled.input.attrs({
    type: 'range',
})`
    -webkit-appearance: none;
    width: 100%;
    background: var(--light1);
    height: 5px;
    border: none;

    &:focus {
        background: var(--light2);
        border: none;
        border-color: none;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        background: var(--primary1);
        width: 20px;
        height: 20px;
        border-radius: 50%;
        cursor: pointer;
    }
`;

export const RangeLabels = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: var(--text0);
    margin-top: 10px;

    & span {
        margin-left: 5px;
    }
`;
