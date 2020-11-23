import { Request, Response } from 'express';
import {
    GameModel as Game,
    GameStationModel as GameStation,
} from '../models/Game';
import * as Yup from 'yup';
import Station from '../models/Station';

class StationController {
    public async index(req: Request, res: Response): Promise<Response> {
        const stations = await GameStation.find();

        return res.json(stations);
    }

    public async indexByGame(req: Request, res: Response): Promise<Response> {
        try {
            const game = await Game.findById(req.params.id);

            const stations = await GameStation.find({ game }).populate(
                'station'
            );

            return res.json(stations);
        } catch (err) {
            return res
                .status(400)
                .send('Nenhuma estação vinculada a esse jogo');
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const schema = Yup.object().shape({
            name: Yup.string().required('Nome da estação deve ser digitado'),
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

    public async update(req: Request, res: Response): Promise<Response> {
        const station = await Station.findById(req.params.id);

        try {
            await Station.findByIdAndUpdate(station.id, {
                ...req.body,
            });
        } catch (err) {
            console.log(err);
            return res
                .status(400)
                .send({ error: 'Dados da estação não atualizadas' });
        }

        return;
    }
}

export default new StationController();
