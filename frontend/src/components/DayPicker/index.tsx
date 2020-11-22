import { useField } from '@unform/core';
import React, { useState, useEffect } from 'react';
import { Wrapper, Container, DayPick, DayCircle } from './styles';
import moment from 'moment';

export interface IDay {
    day: number;
    label: string;
    backendDate: string;
    disabled: boolean;
}

interface IProps {
    name?: string;
    onChange?(day: IDay | undefined): void;
}

const DayPicker: React.FC<IProps> = ({ name = 'daypicker', onChange }) => {
    const [selected, setSelected] = useState<IDay | undefined>(undefined);
    const [currentDays, setCurrentDays] = useState<IDay[]>([]);

    const { fieldName, registerField, error, clearError } = useField(name);

    function loadDays() {
        const firstDate = moment();
        const dayLabels = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
        const days = [];

        firstDate.subtract(moment().day(), 'days');

        for (let i = 0; i < 7; i++) {
            const currentDate = moment();

            currentDate.add(i, 'days');

            const day: IDay = {
                day: currentDate.date(),
                label: dayLabels[currentDate.day()],
                backendDate: currentDate.format('YYYY-MM-DD'),
                disabled: moment().date() > currentDate.date(),
            };

            days.push(day);
        }

        setCurrentDays(days);

        for (let i = 0; i < 7; i++) {
            if (!days[i].disabled) {
                setSelected(days[i]);
                break;
            }
        }
    }

    function handleSelect(day: number) {
        const selectedDay = currentDays.find(
            currentDay => currentDay.day == day
        );

        if (selectedDay?.disabled) {
            return;
        }

        setSelected(selectedDay);
        clearError();
    }

    useEffect(loadDays, []);

    useEffect(() => {
        if (!selected) return;
        onChange && onChange(selected);
    }, [selected]);

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => {
                return selected;
            },
        });
    }, [fieldName, registerField, selected]);

    return (
        <Wrapper>
            <Container>
                {currentDays.map(({ day, label, disabled }) => (
                    <DayPick
                        key={day}
                        disabled={disabled}
                        selected={selected?.day == day}
                        onClick={() => handleSelect(day)}>
                        <span>{label}</span>
                        <DayCircle>{day}</DayCircle>
                    </DayPick>
                ))}
            </Container>
            {error && <span className='error'>{error}</span>}
        </Wrapper>
    );
};

export default DayPicker;
