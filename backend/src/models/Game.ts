import mongoose from '../database/connections';
import { IStation } from './Station';

export interface IGame extends mongoose.Document {
    name: string;
    imageURL: string;
}

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
});

const GameModel = mongoose.model<IGame>('Game', GameSchema);

export interface IGameStation extends mongoose.Document {
    station: IStation;
    game: IGame;
}

const GameStationSchema = new mongoose.Schema({
    station: {
        type: mongoose.Types.ObjectId,
        ref: 'Station',
    },
    game: {
        type: mongoose.Types.ObjectId,
        ref: 'Game',
    },
});

const GameStationModel = mongoose.model<IGameStation>(
    'GameStation',
    GameStationSchema
);

export { GameModel, GameStationModel };
