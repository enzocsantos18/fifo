import React from 'react';
import { Line, Circle } from './styles';

interface ISizeProps {
    width?: string;
    height?: string;
    style?: React.CSSProperties;
}

const LineShimmer: React.FC<ISizeProps> = ({
    width = '100%',
    height = '12px',
    style,
}) => <Line style={{ width, height, ...style }}></Line>;

const CircleShimmer: React.FC<ISizeProps> = ({
    width = '100%',
    height = '12px',
    style,
}) => <Circle style={{ width, height, ...style }}></Circle>;

export { LineShimmer, CircleShimmer };
