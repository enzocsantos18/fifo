import { io } from 'socket.io-client';
import { ISchedule } from '../components/ScheduleItem';

export default io('http://localhost:3333');

export interface IScheduleCreateMessage {
    schedule: ISchedule
}

export interface IScheduleDeleteMessage {
    id: string;
}