import mongoose from '../database/connections';

export interface IStation extends mongoose.Document {
    name: String,
};

const StationSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
    },
});

export default mongoose.model<IStation>('Station', StationSchema);