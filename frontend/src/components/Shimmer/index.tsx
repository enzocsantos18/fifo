import React from 'react';
import { Line, Circle } from './styles';

interface ISizeProps {
    width?: string;
    height?: string;
}

const LineShimmer: React.FC<ISizeProps> = ({ width = '100%', height = '12px' }) => (
    <Line style={{ width, height }}></Line>
);

const CircleShimmer: React.FC<ISizeProps> = ({ width = '100%', height = '12px' }) => (
    <Circle style={{ width, height }}></Circle>
);

export { LineShimmer, CircleShimmer };
