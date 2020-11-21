import React, { useState, useEffect } from 'react';

import moment from 'moment';
import API from '../../services/api';
import Modal from '../../components/Modal';
import ScheduleItem from '../../components/ScheduleItem';
import Button from './../../components/Input/Button/index';
import { Container, DayList, DaySchedules, ScheduleList } from './styles';
import { ModalActions } from './../../components/Modal/styles';
import { LineShimmer } from '../../components/Shimmer';
import { ISchedule } from './../../components/ScheduleItem/index';

interface IDay {
    label: string;
    date: string;
    schedules: ISchedule[];
}

const MySchedules: React.FC = () => {
    const [currentDays, setCurrentDays] = useState<IDay[]>([]);
    const [deletingScheduleId, setDeletingScheduleId] = useState('');
    const [isDeletingSchedule, setDeletingSchedule] = useState(false);

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
                const scheduleEndDate = moment(schedule.date);
                scheduleEndDate.add(schedule.time, 'minutes');

                if (currentDate.day() === scheduleDate.day()) {
                    day.schedules.push({
                        ...schedule,
                        horary: scheduleDate.format('HH:mm'),
                        endHorary: scheduleEndDate.format('HH:mm'),
                    });
                }
            });

            days.push(day);
        }

        setCurrentDays(days);
    }

    function handleScheduleDelete() {
        setDeletingSchedule(false);
        API.delete(`schedules/${deletingScheduleId}`)
            .then(() => {
                setCurrentDays(
                    currentDays.map(day => {
                        const newSchedules = day.schedules.filter(
                            schedule => schedule._id !== deletingScheduleId
                        );
                        return { ...day, schedules: newSchedules };
                    })
                );
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        loadDays();
    }, []);

    return (
        <>
            <Container>
                <DayList>
                    {currentDays.length > 0 ? (
                        <>
                            {currentDays.map(day => (
                                <DaySchedules key={day.date}>
                                    <h2>{day.label}</h2>
                                    <small>Dia {day.date}</small>
                                    {day.schedules.length > 0 ? (
                                        <ScheduleList>
                                            {day.schedules.map(schedule => (
                                                <ScheduleItem
                                                    key={schedule._id}
                                                    variant='game'
                                                    schedule={schedule}
                                                    showSettings={true}
                                                    onDelete={() => {
                                                        setDeletingScheduleId(
                                                            schedule._id
                                                        );
                                                        setDeletingSchedule(
                                                            true
                                                        );
                                                    }}
                                                />
                                            ))}
                                        </ScheduleList>
                                    ) : (
                                        <p>
                                            Você não tem nenhum horário marcado
                                            esse dia!
                                        </p>
                                    )}
                                </DaySchedules>
                            ))}
                        </>
                    ) : (
                        [...Array(7)].map((element, index) => (
                            <DaySchedulesShimmer key={index} />
                        ))
                    )}
                </DayList>
            </Container>
            <Modal isVisible={isDeletingSchedule} width='400px'>
                <h3>Tem certeza que deseja cancelar esse horário?</h3>

                <ModalActions>
                    <Button
                        onClick={() => setDeletingSchedule(false)}
                        variant='secondary'>
                        Não
                    </Button>
                    <Button onClick={handleScheduleDelete}>Sim</Button>
                </ModalActions>
            </Modal>
        </>
    );
};

const DaySchedulesShimmer: React.FC = () => (
    <DaySchedules>
        <LineShimmer style={{ marginTop: 15 }} height='24px' />
        <LineShimmer style={{ marginTop: 8 }} height='12px' />
        <LineShimmer style={{ marginTop: 20 }} height='12px' />
    </DaySchedules>
);

export default MySchedules;
