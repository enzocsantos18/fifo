import React, { useState, InputHTMLAttributes, useEffect, useRef } from 'react';
import { Wrapper } from './styles';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { MdWarning } from 'react-icons/md';
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
    const {
        fieldName,
        defaultValue,
        registerField,
        error,
        clearError,
    } = useField(name);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
        <Wrapper hasIcon={icon !== null} variant={error ? 'danger' : variant}>
            <input
                ref={inputRef}
                type={
                    type == 'password'
                        ? isPasswordVisible
                            ? 'text'
                            : 'password'
                        : type
                }
                onChange={clearError}
                onFocus={clearError}
                defaultValue={defaultValue}
                {...rest}></input>

            {error ? (
                <span>
                    <MdWarning size={20} />
                </span>
            ) : (
                <>
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
                </>
            )}
            {error && <small className='error'>{error}</small>}
        </Wrapper>
    );
};

export default TextInput;
