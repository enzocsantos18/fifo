import React, { useState, InputHTMLAttributes, useEffect, useRef } from 'react';
import { Wrapper } from './styles';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useField } from '@unform/core';

type Variant = 'danger' | 'success' | 'warning' | undefined;

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: JSX.Element;
    variant?: Variant;
}

const TextInput: React.FC<IProps> = ({
    name = 'default',
    type,
    icon,
    variant,
    ...rest
}) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const { fieldName, defaultValue, registerField, error } = useField(name);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
        <Wrapper hasIcon={icon !== null} variant={variant}>
            <input
                ref={inputRef}
                type={
                    type == 'password'
                        ? isPasswordVisible
                            ? 'text'
                            : 'password'
                        : type
                }
                defaultValue={defaultValue}
                {...rest}></input>

            {type == 'password' ? (
                <>
                    {isPasswordVisible ? (
                        <span onClick={() => setPasswordVisible(false)}>
                            <IoMdEye size={20} />
                        </span>
                    ) : (
                        <span onClick={() => setPasswordVisible(true)}>
                            <IoMdEyeOff size={20} />
                        </span>
                    )}
                </>
            ) : (
                <>{icon && <span>{icon}</span>}</>
            )}
            {error && <span className='error'>{error}</span>}
        </Wrapper>
    );
};

export default TextInput;
