import React, { useState, useEffect } from 'react';
import { MdMoreVert, MdRemoveCircleOutline } from 'react-icons/md';

import {
    Container,
    DayList,
    DaySchedules,
    ScheduleList,
    Schedule,
    ScheduleTime,
    ScheduleJoint,
    ScheduleDetails,
    ScheduleInfo,
} from './styles';
import moment from 'moment';
import API from '../../services/api';
import Dropdown from '../../components/Dropdown';

interface IScheduleStation {
    _id: string;
    name: string;
}

interface IScheduleGame {
    _id: string;
    name: string;
}

interface ISchedule {
    _id: string;
    date: string;
    horary: string;
    station: IScheduleStation;
    game: IScheduleGame;
    time: number;
}

interface IDay {
    label: string;
    date: string;
    schedules: ISchedule[];
}

const MySchedules: React.FC = () => {
    const [currentDays, setCurrentDays] = useState<IDay[]>([]);

    async function loadDays() {
        const { data: schedules } = await API.get<ISchedule[]>('schedules');

        const firstDate = moment();

        const dayLabels = [
            'Domingo',
            'Segunda-feira',
            'Terça-feira',
            'Quarta-feira',
            'Quinta-feira',
            'Sexta-feira',
            'Sábado',
        ];

        firstDate.subtract(moment().day(), 'days');

        const days = [];

        for (let i = 0; i < 7; i++) {
            const currentDate = moment();

            currentDate.add(i, 'days');

            const day: IDay = {
                label: dayLabels[currentDate.day()],
                date: currentDate.format('DD/MM/YY'),
                schedules: [],
            };

            schedules.forEach(schedule => {
                const scheduleDate = moment(schedule.date);
                if (currentDate.day() === scheduleDate.day()) {
                    day.schedules.push({
                        ...schedule,
                        horary: scheduleDate.format('HH:mm'),
                    });
                }
            });

            days.push(day);
        }

        setCurrentDays(days);
    }

    useEffect(() => {
        loadDays();
    }, []);

    return (
        <Container>
            <DayList>
                {currentDays.map(day => (
                    <DaySchedules key={day.date}>
                        <h2>{day.label}</h2>
                        <small>Dia {day.date}</small>
                        {day.schedules.length > 0 ? (
                            <ScheduleList>
                                {day.schedules.map(schedule => (
                                    <Schedule key={schedule._id}>
                                        <ScheduleTime>
                                            <span>{schedule.horary}</span>
                                            <ScheduleJoint />
                                        </ScheduleTime>
                                        <ScheduleDetails>
                                            <ScheduleInfo>
                                                <span>
                                                    {schedule.game.name}
                                                </span>
                                                <span>
                                                    {schedule.station.name}
                                                </span>
                                            </ScheduleInfo>
                                            <Dropdown
                                                width='120px'
                                                items={[
                                                    {
                                                        text: 'Excluir',
                                                        icon: <MdRemoveCircleOutline />
                                                    },
                                                ]}>
                                                <MdMoreVert size={24} />
                                            </Dropdown>
                                        </ScheduleDetails>
                                    </Schedule>
                                ))}
                            </ScheduleList>
                        ) : (
                            <p>Você não tem nenhum horário marcado esse dia!</p>
                        )}
                    </DaySchedules>
                ))}
            </DayList>
        </Container>
    );
};

export default MySchedules;
