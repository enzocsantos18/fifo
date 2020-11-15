import { Request, Response } from 'express';
import {
    GameModel as Game,
    GameStationModel as GameStation,
} from '../models/Game';
import * as Yup from 'yup';
import Station from '../models/Station';
import fs from 'fs';
import { Types } from 'mongoose';

class GameController {
    public async index(req: Request, res: Response): Promise<Response> {
        const games = await Game.find();

        return res.json(games);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const schema = Yup.object().shape({
            name: Yup.string().required('Name is required'),
            stations: Yup.array().required('Stations is required'),
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
            fs.unlinkSync(req.file.path);
            return res.status(400).send(errors);
        }

        try {
            const game = await Game.create({
                ...req.body,
                imageURL: req.file.filename,
            });

            const stations = JSON.parse(req.body['stations']);

            stations.forEach(async (stationId: string) => {
                if (!Types.ObjectId.isValid(stationId)) {
                    fs.unlinkSync(req.file.path);
                    return res
                        .status(400)
                        .send({ station: 'Invalid station id format' });
                }

                if (await Station.exists({ _id: stationId })) {
                    const station = await Station.findById(stationId);

                    await GameStation.create({
                        game,
                        station,
                    });
                } else {
                    fs.unlinkSync(req.file.path);
                    return res.status(400).send({ station: 'Unknown station' });
                }
            });

            return res.json(game);
        } catch (err) {
            console.log(err);
            fs.unlinkSync(req.file.path);
            return res.status(400).send({ game: 'Invalid game' });
        }
    }
}

export default new GameController();
