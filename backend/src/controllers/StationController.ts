import { Request, Response } from 'express';
import {
    GameModel as Game,
    GameStationModel as GameStation,
} from '../models/Game';
import * as Yup from 'yup';
import Station from '../models/Station';

class StationController {
    public async indexByGame(req: Request, res: Response): Promise<Response> {
        try {
            const game = await Game.findById(req.params.id);

            const station = await GameStation.find({ game }).populate('game').populate('station');

            return res.json(station);
        } catch (err) {
            return res.status(400).send('No stations linked to that game');
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const schema = Yup.object().shape({
            name: Yup.string().required('Name is required'),
        });

        try {
            await schema.validate(req.body, {
                abortEarly: false,
            });
        } catch (err) {
            const errors = {};
            err.inner.forEach(error => {
                errors[error.path] = error.message;
            });
            return res.status(400).send(errors);
        }

        const station = await Station.create(req.body);

        return res.json(station);
    }
}

export default new StationController();
