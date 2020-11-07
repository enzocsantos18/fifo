import { Request, Response } from 'express';
import { GameModel as Game } from '../models/Game';
import * as Yup from 'yup';

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

        const game = await Game.create(req.body);

        return res.json(game);
    }
}

export default new GameController();
