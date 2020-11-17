import styled from 'styled-components';

export const Line = styled.div`
    background: var(--shimmer0);
    background-image: linear-gradient(
        to right,
        var(--shimmer0) 0%,
        var(--shimmer1) 40%,
        var(--shimmer0) 80%,
        var(--shimmer0) 100%
    );
    background-repeat: no-repeat;
    border-radius: 5px;

    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: shimmer;
    animation-timing-function: linear;
`;

export const Circle = styled(Line)`
    border-radius: 50%;
`;
