import { Request, Response } from 'express';
import {
    GameModel as Game,
    GameStationModel as GameStation,
} from '../models/Game';
import * as Yup from 'yup';
import Station from '../models/Station';

class GameController {
    public async index(req: Request, res: Response): Promise<Response> {
        const games = await Game.find();

        return res.json(games);
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

        try {
            const game = await Game.create(req.body);

            const { stations } = req.body;

            if (!stations) {
                return res.status(400).send({ station: 'Unknown station' });
            }

            stations.forEach(async stationId => {
                const station = await Station.findById(stationId);

                if (!station)
                    return res.status(400).send({ station: 'Unknown station' });

                await GameStation.create({
                    game,
                    station,
                });
            });

            return res.json(game);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ game: 'Invalid game' });
        }
    }
}

export default new GameController();
