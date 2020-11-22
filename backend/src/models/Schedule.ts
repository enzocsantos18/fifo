import mongoose from '../database/connections';
import { IUser } from './User';
import { IStation } from './Station';
import { IGame } from './Game';

interface ISchedule extends mongoose.Document {
    date: Date;
    user: IUser;
    station: IStation;
    game: IGame;
}

const ScheduleSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    station: {
        type: mongoose.Types.ObjectId,
        ref: 'Station',
    },
    game: {
        type: mongoose.Types.ObjectId,
        ref: 'Game',
    },
});

export default mongoose.model<ISchedule>('Schedule', ScheduleSchema);
