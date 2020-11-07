import mongoose from '../database/connections';

export interface IStation extends mongoose.Document {
    name: String,
    minPlayers: Number,
    maxPlayers: Number
};

const StationSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
    }, 
    minPlayers: {
        type: Number,
        required: true,
    },
    maxPlayers: {
        type: Number,
        required: true,
    },
});

export default mongoose.model('Station', StationSchema);