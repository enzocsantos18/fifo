import React from 'react';

import {
    Container,
    ScheduleTime,
    ScheduleJoint,
    ScheduleDetails,
    ScheduleInfo,
    ScheduleUserInfo
} from './styles';

import Dropdown from '../Dropdown';
import { MdRemoveCircleOutline, MdMoreVert } from 'react-icons/md';
import ProfileAvatar from '../ProfileAvatar';
import { media } from '../../services/media';

type Type = 'user' | 'game';

interface IScheduleStation {
    _id: string;
    name: string;
}

interface IScheduleGame {
    _id: string;
    name: string;
}

interface IScheduleUser {
    _id: string;
    name: string;
    imageURL: string;
    shortName?: string;
}

export interface ISchedule {
    _id: string;
    date: string;
    horary: string;
    station: IScheduleStation;
    game: IScheduleGame;
    user: IScheduleUser;
    time: number;
}

interface IProps {
    variant: Type;
    schedule: ISchedule;
    onDelete?(): void;

    showSettings?: boolean;
}

const Schedule: React.FC<IProps> = ({
    variant,
    schedule,
    onDelete,
    showSettings = false,
}) => {
    return (
        <Container
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layout>
            {variant == 'game' && (
                <>
                    <ScheduleTime>
                        <span>{schedule.horary}</span>
                        <ScheduleJoint />
                    </ScheduleTime>
                    <ScheduleDetails>
                        <ScheduleInfo>
                            <span>{schedule.game.name}</span>
                            <span>{schedule.station.name}</span>
                        </ScheduleInfo>
                        {showSettings && (
                            <Dropdown
                                width='150px'
                                items={[
                                    {
                                        text: 'Cancelar',
                                        icon: (
                                            <MdRemoveCircleOutline size={20} />
                                        ),
                                        onClick: onDelete && onDelete,
                                    },
                                ]}>
                                <MdMoreVert size={24} />
                            </Dropdown>
                        )}
                    </ScheduleDetails>
                </>
            )}

            {variant == 'user' && (
                <>
                    <ScheduleTime>
                        <span>{schedule.horary}</span>
                        <ScheduleJoint />
                    </ScheduleTime>
                    <ScheduleDetails>
                        <ScheduleUserInfo>
                            <span>{schedule.user.shortName}</span>
                            <ProfileAvatar
                                imageURL={media(
                                    'user',
                                    schedule.user.imageURL,
                                    true
                                )}
                                username={schedule.user.name}
                                size={40}
                            />
                        </ScheduleUserInfo>
                        {showSettings && (
                            <Dropdown
                                width='150px'
                                items={[
                                    {
                                        text: 'Cancelar',
                                        icon: (
                                            <MdRemoveCircleOutline size={20} />
                                        ),
                                        onClick: onDelete && onDelete,
                                    },
                                ]}>
                                <MdMoreVert size={24} />
                            </Dropdown>
                        )}
                    </ScheduleDetails>
                </>
            )}
        </Container>
    );
};

export default Schedule;
