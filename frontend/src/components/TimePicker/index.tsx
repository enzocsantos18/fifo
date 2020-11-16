import { useField } from '@unform/core';
import React, { useEffect, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Button from '../Input/Button';

import { Container, Separator, TimeInput } from './styles';

export interface ITime {
    hours: number;
    minutes: number;
}

interface IProps {
    name?: string;
}

const TimePicker: React.FC<IProps> = ({ name = 'timepicker' }) => {
    let [hours, setHours] = useState(15);
    let [minutes, setMinutes] = useState(0);

    const { fieldName, registerField, error } = useField(name);

    function handleSubtract() {
        minutes -= 15;

        if (minutes < 0) {
            minutes = 45;

            hours--;
        }

        if (hours < 0) {
            hours = 0;
        }

        setHours(hours);
        setMinutes(minutes);
    }

    function handleAdd() {
        minutes += 15;

        if (minutes >= 60) {
            minutes = 0;

            hours++;
        }

        if (hours > 24) {
            hours = 23;
        }

        setHours(hours);
        setMinutes(minutes);
    }

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => {
                return {
                    hours: hours.toString().padStart(2, '0'),
                    minutes: minutes.toString().padStart(2, '0'),
                };
            },
        });
    }, [fieldName, registerField, hours, minutes]);

    return (
        <Container>
            <Button onClick={handleSubtract} type='button'>
                <MdChevronLeft size={24} />
            </Button>
            <TimeInput>{hours.toString().padStart(2, '0')}</TimeInput>
            <Separator>:</Separator>
            <TimeInput>{minutes.toString().padStart(2, '0')}</TimeInput>
            <Button onClick={handleAdd} type='button'>
                <MdChevronRight size={24} />
            </Button>
        </Container>
    );
};

export default TimePicker;
