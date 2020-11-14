import React, { useState, useEffect } from 'react';
import { Container, DayPick, DayCircle } from './styles';

interface IDay {
    day: number;
    label: string;
    disabled: boolean;
}

const DayPicker: React.FC = () => {
    const [selected, setSelected] = useState<IDay | undefined>(undefined);
    const [currentDays, setCurrentDays] = useState<IDay[]>([]);

    function loadDays() {
        const currentDate = new Date();
        const firstDay = new Date();

        firstDay.setDate(currentDate.getDate() - firstDay.getDay());

        const days = [];
        const dayLabels = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
        for (let i = 0; i < 7; i++) {
            const day = firstDay.getDate() + i + 7;
            days.push({
                day,
                label: dayLabels[i],
                disabled: currentDate.getDate() > day,
            });
        }

        setCurrentDays(days);
    }

    function handleSelect(day: number) {
        const selectedDay = currentDays.find(
            currentDay => currentDay.day == day
        );

        setSelected(selectedDay);
    }

    useEffect(loadDays, []);

    return (
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
    );
};

export default DayPicker;
