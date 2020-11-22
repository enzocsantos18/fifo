import { useField } from '@unform/core';
import React, { useEffect, useState } from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import Button from '../Input/Button';

import { Container, Row, Separator, TimeInput } from './styles';
import { ISchedule } from './../ScheduleItem/index';
import moment, { Moment } from 'moment';

export interface ITime {
    hours: number;
    minutes: number;
    isValid: boolean;
}

interface IReservatedTime {
    startDate: Moment;
    endDate: Moment;
    duration: number;
}

interface IProps {
    name?: string;
    schedules?: ISchedule[];
    duration?: number;
    day: number;
}

const TimePicker: React.FC<IProps> = ({
    name = 'timepicker',
    schedules,
    duration = 45,
    day,
}) => {
    let [hours, setHours] = useState(9);
    let [minutes, setMinutes] = useState(0);
    let [minHours, setMinHours] = useState(9);
    let [minMinutes, setMinMinutes] = useState(0);
    const [reservatedTimes, setReservatedTimes] = useState<IReservatedTime[]>(
        []
    );
    const [isValid, setValid] = useState(true);

    const { fieldName, registerField } = useField(name);

    function loadNextTime() {
        const currentDate = moment();
        const currentMinutes = currentDate.get('minutes');
        const currentHours = currentDate.get('hours');

        if (currentMinutes >= 0 && currentMinutes <= 15) {
            setMinutes(15);
            setMinMinutes(15);
        }

        if (currentMinutes > 15 && currentMinutes <= 30) {
            setMinutes(30);
            setMinMinutes(30);
        }

        if (currentMinutes > 30 && currentMinutes <= 45) {
            setMinutes(45);
            setMinMinutes(45);
        }

        if (currentMinutes > 45 && currentMinutes <= 59) {
            setMinutes(45);
            setMinMinutes(45);
        }

        setHours(currentHours < 6 ? 6 : currentHours);
        setMinHours(currentHours);
    }

    function isBetweenReservated() {
        const startDate = moment(),
            endDate = moment();
        startDate.set('hours', hours);
        startDate.set('minutes', minutes);
        endDate.set('hours', hours);
        endDate.set('minutes', minutes);

        endDate.add(duration - 1, 'minutes');

        const reservated = reservatedTimes.find(
            reservated =>
                startDate.isBetween(
                    reservated.startDate,
                    reservated.endDate,
                    'minutes',
                    '[)'
                ) ||
                endDate.isBetween(
                    reservated.startDate,
                    reservated.endDate,
                    'minutes',
                    '[)'
                )
        );

        return reservated;
    }

    function handleAdd(quantity: number) {
        if (hours == 23 && minutes == 45) return;

        minutes += quantity;

        if (minutes >= 60) {
            minutes -= 60;
            hours++;
        }

        if (hours > 23) {
            hours = 23;
        }

        setValid(!isBetweenReservated());
        setHours(hours);
        setMinutes(minutes);
    }

    function handleSubtract(quantity: number) {
        if (
            moment().date() == day &&
            minutes == minMinutes &&
            hours == minHours
        )
            return;
        if (minutes == 0 && hours == 6) return;

        minutes -= quantity;

        if (minutes < 0) {
            minutes = 60 + minutes;
            hours--;
        }

        if (hours < 6) {
            hours = 6;
        }

        setValid(!isBetweenReservated());
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
                    isValid,
                };
            },
        });
    }, [fieldName, registerField, hours, minutes]);

    useEffect(() => {
        loadNextTime();
    }, [day]);

    useEffect(() => {
        const reservated: IReservatedTime[] = [];

        schedules?.forEach(schedule => {
            const [horaryHours, horaryMinutes] = schedule.horary.split(':');

            const startDate = moment(),
                endDate = moment();

            startDate.set('hours', Number(horaryHours));
            startDate.set('minutes', Number(horaryMinutes));

            endDate.set('hours', Number(horaryHours));
            endDate.set('minutes', Number(horaryMinutes));

            endDate.add(schedule.time, 'minutes');

            const time = {
                startDate,
                endDate,
                duration: schedule.time,
            };

            reservated.push(time);
        });

        setReservatedTimes(reservated);
    }, [schedules]);

    useEffect(() => {
        setValid(!isBetweenReservated());
    }, [duration]);

    return (
        <Container>
            <Row>
                <Button onClick={() => handleAdd(60)} type='button'>
                    <MdExpandLess size={24} />
                </Button>
                <Button onClick={() => handleAdd(15)} type='button'>
                    <MdExpandLess size={24} />
                </Button>
            </Row>
            <Row>
                <TimeInput>{hours.toString().padStart(2, '0')}</TimeInput>
                <Separator>:</Separator>
                <TimeInput>{minutes.toString().padStart(2, '0')}</TimeInput>
            </Row>
            <Row>
                <Button onClick={() => handleSubtract(60)} type='button'>
                    <MdExpandMore size={24} />
                </Button>
                <Button onClick={() => handleSubtract(15)} type='button'>
                    <MdExpandMore size={24} />
                </Button>
            </Row>
            {!isValid && <span className='error'>Horário indisponível!</span>}
        </Container>
    );
};

export default TimePicker;
