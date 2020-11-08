import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

interface IInputProps {
    name: string;
    as: any;
}

type InputProps = JSX.IntrinsicElements['input'] & IInputProps;

const Input: React.FC<InputProps> = ({ name, as, ...rest }) => {
    const inputRef = useRef(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            path: 'value',
            ref: inputRef.current,
        });
    }, [fieldName, registerField]);

    const element = React.cloneElement(as, {
        ref: inputRef,
        defaultValue,
        ...rest,
    });

    return (
        <>
            {element}
            {error && <span>{error}</span>}
        </>
    );
};

export default Input;
