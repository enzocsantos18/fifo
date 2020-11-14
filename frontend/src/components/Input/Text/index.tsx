import React, { InputHTMLAttributes } from 'react';
import { Wrapper } from './styles';

type Variant = 'danger' | 'success' | 'warning' | undefined;

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: JSX.Element;
    variant?: Variant;
}

const TextInput: React.FC<IProps> = ({ type, icon, variant, ...rest }) => {
    return (
        <Wrapper hasIcon={icon !== null} variant={variant}>
            <input type={type} {...rest}></input>
            {icon && <span>{icon}</span>}
        </Wrapper>
    );
};

export default TextInput;
