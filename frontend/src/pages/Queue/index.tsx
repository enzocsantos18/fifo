import React, { useEffect, useState } from 'react';

import {
    Wrapper,
    Container,
    QueueList,
    QueueItem,
    QueueProfile,
    QueueGame,
    QueueDetails,
    QueueStatus,
    QueueStatusCircle,
    Actions,
    QueueItemShimmerContainer,
} from './styles';
import ProfileAvatar from './../../components/ProfileAvatar';
import Button from './../../components/Input/Button/index';
import { MdArrowBack, MdAdd } from 'react-icons/md';
import API from './../../services/api';
import { useLocation, useHistory } from 'react-router-dom';
import { shortName } from './../../util/index';
import { StageSpinner } from 'react-spinners-kit';
import socket, { IScheduleCreateMessage } from '../../services/socket';
import { IScheduleDeleteMessage } from './../../services/socket';
import { media } from '../../services/media';
import Modal from '../../components/Modal';
import { CircleShimmer, LineShimmer } from '../../components/Shimmer';
import { AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';

interface ILocationState {
    game?: string;
    station?: string;
}

interface IScheduleGame {
    _id: string;
    name: string;
}

interface IScheduleUser {
    _id: string;
    name: string;
    shortName: string;
    imageURL: string;
}

interface IScheduleStation {
    _id: string;
    name: string;
}

export interface ISchedule {
    _id: string;
    date: string;
    game: IScheduleGame;
    user: IScheduleUser;
    station: IScheduleStation;
}

const Queue: React.FC = () => {
    const location = useLocation<ILocationState>();
    const history = useHistory();

    const [queue, setQueue] = useState<ISchedule[]>([]);
    const [isUpdating, setUpdating] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isJoined, setJoined] = useState(false);
    const [isJoinedOutside, setJoinedOutside] = useState(false);
    const [userSchedule, setUserSchedule] = useState<ISchedule | null>(null);
    const [isUserTurn, setUserTurn] = useState(false);
    const [isUserTurnConfirmed, setUserTurnConfirmed] = useState(false);

    const [playAlertSound] = useSound('/alert.mp3');
    const [alertInterval, setAlertInterval] = useState<number | null>(null);

    async function loadSchedules() {
        setLoading(true);

        const { station } = location.state;

        const { data: schedules } = await API.get<ISchedule[]>(`schedules/${station}`);

        const { data: userSchedules } = await API.get<ISchedule[]>('schedules');

        if (userSchedules.length > 0) {
            const [schedule] = userSchedules;

            if (schedule.station._id !== station) {
                setJoinedOutside(true);
            } else {
                setJoined(true);
            }

            setUserSchedule(schedule);
        }

        setQueue(
            schedules.map(schedule => {
                return parseSchedule(schedule);
            })
        );
        setLoading(false);
    }

    async function handleJoin() {
        setUpdating(true);
        setUserTurn(false);
        setUserTurnConfirmed(false);

        const { station, game } = location.state;

        if (isJoinedOutside) {
            await API.delete(`schedules/${userSchedule?._id}`);
            setJoinedOutside(false);
        }

        if (isJoined) {
            await API.delete(`schedules/${userSchedule?._id}`);
            setJoined(false);
        } else {
            const { data: schedule } = await API.post('schedules/', {
                station,
                game,
            });
            setJoined(true);
            setUserSchedule(schedule);
        }

        setUpdating(false);
    }

    function parseSchedule(schedule: ISchedule) {
        return {
            ...schedule,
            user: {
                ...schedule.user,
                shortName: shortName(schedule.user.name),
            },
        };
    }

    function addSchedule(schedule: ISchedule) {
        setQueue(currentQueue => [...currentQueue, parseSchedule(schedule)]);
    }

    function removeSchedule(id: string) {
        setQueue(currentQueue => currentQueue.filter(schedule => schedule._id !== id));
    }

    function checkUserTurn() {
        if (queue.length > 0) {
            const [firstSchedule] = queue;

            if (firstSchedule._id === userSchedule?._id) {
                setUserTurn(true);

                if (!isUserTurnConfirmed) alertUserTurn();
            }
        }
    }

    function alertUserTurn() {
        playAlertSound();

        const interval = setInterval(() => {
            playAlertSound();
            document.title = document.title === 'Fila - FIFO' ? '?? a sua vez na fila! - FIFO' : 'Fila - FIFO';
        }, 1000);

        setAlertInterval(interval);
    }

    function confirmUserTurn() {
        setUserTurn(false);
        setUserTurnConfirmed(true);
        document.title = 'Fila - FIFO';

        if (alertInterval) clearInterval(alertInterval);
    }

    function setupSocket() {
        const { station } = location.state;

        socket.emit('subscribe', { room: station });

        socket.on('schedule-create', (data: IScheduleCreateMessage) => {
            addSchedule(data.schedule);
        });

        socket.on('schedule-delete', (data: IScheduleDeleteMessage) => {
            removeSchedule(data.id);
        });
    }

    function unsetupSocket() {
        socket.off('schedule-create');
        socket.off('schedule-delete');
    }

    useEffect(() => {
        if (!location.state) {
            history.push('/schedule/game');

            return;
        }
        loadSchedules();
        setupSocket();

        return () => unsetupSocket();
    }, []);

    useEffect(() => {
        checkUserTurn();
    }, [queue, userSchedule]);

    return (
        <>
            <Wrapper>
                <Container>
                    <h1>Fila</h1>
                    <QueueList>
                        {!isLoading ? (
                            <>
                                {queue.length > 0 ? (
                                    <AnimateSharedLayout>
                                        <AnimatePresence>
                                            {queue.map((schedule, index) => (
                                                <QueueItem key={schedule._id}>
                                                    <QueueProfile>
                                                        <span>{schedule.user.shortName}</span>
                                                        <ProfileAvatar
                                                            imageURL={
                                                                schedule.user.imageURL
                                                                    ? media('user', schedule.user.imageURL, true)
                                                                    : ''
                                                            }
                                                            username={schedule.user.name}
                                                            size={40}
                                                        />
                                                    </QueueProfile>
                                                    <QueueGame>
                                                        <span>{schedule.game.name}</span>
                                                    </QueueGame>
                                                    <QueueDetails>
                                                        {index == 0 && (
                                                            <QueueStatus>
                                                                <QueueStatusCircle />
                                                                <span>JOGANDO</span>
                                                            </QueueStatus>
                                                        )}
                                                        <span>{index + 1}??</span>
                                                    </QueueDetails>
                                                </QueueItem>
                                            ))}
                                        </AnimatePresence>
                                    </AnimateSharedLayout>
                                ) : (
                                    <h2>Ainda n??o h?? ningu??m na fila. Seja o primeiro!</h2>
                                )}
                            </>
                        ) : (
                            <>
                                {[...Array(3)].map((element, index) => (
                                    <QueueItemShimmer key={index} />
                                ))}
                            </>
                        )}
                    </QueueList>
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
                        <Button onClick={handleJoin} type='submit' variant='primary' disabled={isLoading || isUpdating}>
                            {isUpdating ? (
                                <StageSpinner size={24} />
                            ) : (
                                <>
                                    {isJoined ? 'Sair da fila' : 'Entrar na Fila'}
                                    <MdAdd />
                                </>
                            )}
                        </Button>
                    </Actions>
                </Container>
            </Wrapper>

            <Modal isVisible={isUserTurn && !isUserTurnConfirmed} width='360px'>
                <h2>Aten????o!</h2>
                <h3>?? a sua vez de jogar!</h3>
                <p>
                    Recomendamos deixar essa janela aberta durante todo o jogo. Quando quiser terminar, apenas clique em
                    sair da fila. Bom jogo!
                </p>
                <Button onClick={confirmUserTurn}>OK</Button>
            </Modal>
        </>
    );
};

const QueueItemShimmer: React.FC = () => {
    return (
        <QueueItemShimmerContainer>
            <LineShimmer width='70%' height='7px' style={{ marginTop: 15 }} />
            <CircleShimmer width='40px' height='40px' />
            <LineShimmer width='100px' height='7px' style={{ marginTop: 10 }} />
            <LineShimmer width='100px' height='7px' />
        </QueueItemShimmerContainer>
    );
};

export default Queue;
