import mongoose from "../database/connections";
import IUser from './User';

interface ISchedule extends mongoose.Document {
  date: Date;
  user: IUser;
  station: ISchedule['_id'];
}

const ScheduleSchema = new mongoose.Schema({
  date: {
    type: Date,
    require: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  station: {
    type: mongoose.Types.ObjectId,
    ref: "Station",
  },
});

export default mongoose.model<ISchedule>("Schedule", ScheduleSchema);
