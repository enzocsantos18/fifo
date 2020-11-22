import React, { useState, useEffect, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import {
    MdArrowBack,
    MdCheck,
    MdSentimentSatisfied,
    MdSentimentDissatisfied,
} from 'react-icons/md';
import { useHistory, useLocation } from 'react-router-dom';
import DayPicker, { IDay } from '../../components/DayPicker';
import Input from '../../components/Input';
import Button from '../../components/Input/Button';
import { RangeInput, RangeLabels } from '../../components/Input/Range/indes';
import TimePicker, { ITime } from '../../components/TimePicker';
import {
    Container,
    Wrapper,
    Actions,
    RightContainer,
    LoadingContainer,
    ScheduleError,
} from './styles';
import * as Yup from 'yup';
import { StageSpinner } from 'react-spinners-kit';
import API from '../../services/api';
import Modal from '../../components/Modal';
import { AxiosError } from 'axios';
import socket, { IScheduleCreateMessage } from '../../services/socket';
import ScheduleItem, { ISchedule } from '../../components/ScheduleItem';
import { IScheduleDeleteMessage } from './../../services/socket';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import moment from 'moment';
import { shortName } from '../../util';

interface ILocationState {
    game?: string;
    station?: string;
}

interface IFormData {
    time: string;
    day: IDay;
    horary: ITime;
}

const Schedule: React.FC = () => {
    const history = useHistory();
    const location = useLocation<ILocationState>();
    const formRef = useRef<FormHandles>(null);
    const [isLoading, setLoading] = useState(false);
    const [isSubmited, setSubmited] = useState(false);
    const [isLoadingSchedules, setLoadingSchedules] = useState(false);
    const [responseErrors, setResponseErrors] = useState<{
        [path: string]: string;
    }>({});
    const [schedules, setSchedules] = useState<ISchedule[]>([]);
    const [currentTime, setCurrentTime] = useState(45);
    const [currentDay, setCurrentDay] = useState(0);

    async function handleSubmit(data: IFormData) {
        setLoading(true);

        const schema = Yup.object().shape({
            day: Yup.object().required('Selecione um dia!'),
            time: Yup.string().oneOf(
                ['15', '30', '45', '60'],
                'Tempo inválido!'
            ),
            horary: Yup.object().shape({
                isValid: Yup.bool().oneOf([true]),
            }),
        });

        try {
            await schema.validate(data, {
                abortEarly: false,
            });

            const { day, horary, time } = data;
            const { game, station } = location.state;

            API.post('schedules', {
                date: `${day.backendDate} ${horary.hours}:${horary.minutes}`,
                time,
                game,
                station,
            })
                .then(() => {
                    setSubmited(true);
                })
                .catch((err: AxiosError) => {
                    setResponseErrors(err.response?.data);
                })
                .finally(() => {
                    setLoading(false);
                });
        } catch (err) {
            const errors: { [path: string]: string } = {};
            err.inner.forEach((error: Yup.ValidationError) => {
                errors[error.path] = error.message;
            });
            formRef.current?.setErrors(errors);
            setLoading(false);
        }
    }

    function getResponseError() {
        if (responseErrors.hasOwnProperty('error')) {
            return responseErrors['error'];
        }

        let response = '';
        Object.keys(responseErrors).forEach(key => {
            response += `${responseErrors[key]} \n`;
        });

        return response;
    }

    async function loadSchedules(day: number) {
        setLoadingSchedules(true);

        const { station } = location.state;

        let { data: schedules } = await API.post<ISchedule[]>(
            `schedules/${station}`,
            {
                day,
            }
        );

        schedules = schedules.map(schedule => {
            const scheduleDate = moment(schedule.date);
            const scheduleEndDate = moment(schedule.date);
            scheduleEndDate.add(schedule.time, 'minutes');

            return {
                ...schedule,
                horary: scheduleDate.format('HH:mm'),
                endHorary: scheduleEndDate.format('HH:mm'),
                user: {
                    ...schedule.user,
                    shortName: shortName(schedule.user.name),
                },
            };
        });

        setSchedules(schedules);
        setLoadingSchedules(false);
    }

    function addSchedule(schedule: ISchedule) {
        setCurrentDay(day => {
            const scheduleDate = moment(schedule.date);

            if (scheduleDate.date() !== day) return day;

            setSchedules(currentSchedules => {
                currentSchedules.sort(
                    (a, b) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                );
                const scheduleDate = moment(schedule.date);
                const scheduleEndDate = moment(schedule.date);
                scheduleEndDate.add(schedule.time, 'minutes');

                return [
                    ...currentSchedules,
                    {
                        ...schedule,
                        horary: scheduleDate.format('HH:mm'),
                        endHorary: scheduleEndDate.format('HH:mm'),
                        user: {
                            ...schedule.user,
                            shortName: shortName(schedule.user.name),
                        },
                    },
                ];
            });

            return day;
        });
    }

    function removeSchedule(id: string) {
        setSchedules(currentSchedules =>
            currentSchedules.filter(schedule => schedule._id !== id)
        );
    }

    function setupServer() {
        const { station } = location.state;

        socket.emit('subscribe', { room: station });

        socket.on('schedule-create', (data: IScheduleCreateMessage) => {
            addSchedule(data.schedule);
        });

        socket.on('schedule-delete', (data: IScheduleDeleteMessage) => {
            removeSchedule(data.id);
        });
    }

    function unsetupServer() {
        socket.off('schedule-create');
        socket.off('schedule-delete');
    }

    function handleDayChange({ day }: IDay) {
        loadSchedules(day);
        setCurrentDay(day);
    }

    useEffect(() => {
        if (!location.state) {
            history.push('/schedule/game');

            return;
        }
        setupServer();

        return () => unsetupServer();
    }, []);

    return (
        <>
            <Wrapper>
                <Container>
                    <Form onSubmit={handleSubmit} ref={formRef}>
                        <h1>Agendar</h1>

                        <label>Dia</label>

                        <DayPicker name='day' onChange={handleDayChange} />

                        <label>Horário</label>

                        <TimePicker
                            name='horary'
                            schedules={schedules}
                            duration={currentTime}
                            day={currentDay}
                        />

                        <label>Tempo</label>
                        <Input
                            name='time'
                            defaultValue={currentTime}
                            as={
                                <RangeInput
                                    max={60}
                                    min={15}
                                    step={15}
                                    onChange={e =>
                                        setCurrentTime(Number(e.target.value))
                                    }
                                />
                            }
                        />
                        <RangeLabels>
                            <span>15 min.</span>
                            <span>30 min.</span>
                            <span>45 min.</span>
                            <span>60 min.</span>
                        </RangeLabels>
                        <Actions>
                            <Button
                                variant='secondary'
                                onClick={() =>
                                    history.push('/schedule/station', {
                                        ...location.state,
                                    })
                                }>
                                <MdArrowBack />
                                Voltar
                            </Button>
                            <Button
                                type='submit'
                                variant='primary'
                                disabled={isLoading}>
                                {isLoading ? (
                                    <StageSpinner size={24} />
                                ) : (
                                    <>
                                        Concluir
                                        <MdCheck />
                                    </>
                                )}
                            </Button>
                        </Actions>
                    </Form>
                </Container>
                <RightContainer>
                    <h1>Horários marcados</h1>

                    {!isLoadingSchedules ? (
                        <>
                            {schedules.length > 0 ? (
                                <AnimateSharedLayout>
                                    <motion.div layout>
                                        <AnimatePresence>
                                            {schedules.map(schedule => (
                                                <ScheduleItem
                                                    key={schedule._id}
                                                    variant='user'
                                                    schedule={schedule}
                                                />
                                            ))}
                                        </AnimatePresence>
                                    </motion.div>
                                </AnimateSharedLayout>
                            ) : (
                                <p>Nenhum horário marcado nesse local e dia!</p>
                            )}
                        </>
                    ) : (
                        <LoadingContainer>
                            <StageSpinner color='#626770' size={70} />
                        </LoadingContainer>
                    )}
                </RightContainer>
            </Wrapper>
            <Modal isVisible={isSubmited}>
                <MdSentimentSatisfied size={70} />
                <h3>Agendamento feito com sucesso!</h3>
                <Button onClick={() => history.push('/account/schedules')}>
                    OK
                </Button>
            </Modal>
            <Modal isVisible={Object.keys(responseErrors).length > 0}>
                <MdSentimentDissatisfied size={70} />
                <h3>Não foi possível agendar:</h3>
                <ScheduleError>{getResponseError()}</ScheduleError>
                <Button onClick={() => setResponseErrors({})}>OK</Button>
            </Modal>
        </>
    );
};

export default Schedule;
