import mongoose from '../database/connections';
import { IUser } from './User';
import { IStation } from './Station';


interface ISchedule extends mongoose.Document {
    date: Date;
    user: IUser;
    station: IStation;
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
});

export default mongoose.model<ISchedule>('Schedule', ScheduleSchema);
