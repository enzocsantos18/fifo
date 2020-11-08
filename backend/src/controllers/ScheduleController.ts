import { Request, Response } from 'express';
import Schedule from '../models/Schedule';

class ScheduleController {
    public async index(req: Request, res: Response): Promise<Response> {
        const listSchedule = await Schedule.find();

        return res.send(listSchedule);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { date } = req.body;

        try {
            if (await Schedule.findOne({ date }))
                return res
                    .status(400)
                    .send({ error: 'Schedule already exists' });

            const createSchedule = await Schedule.create(req.body);

            return res.send(createSchedule);
        } catch (err) {
            return res.status(400).send({ error: 'Schedule failed' });
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        return;
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        return;
    }
}

export default new ScheduleController();
