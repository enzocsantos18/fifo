import { Request, Response } from 'express';
import Schedule from '../models/Schedule';
import User from '../models/User';

class ScheduleController {
    public async index(req: Request, res: Response): Promise<Response> {

        const user = await User.findById(res.locals['user'].id);

        const schedules = await Schedule.findOne({
            user
        });

        return res.send(schedules);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { date } = req.body;

        try {
            if (await Schedule.findOne({ date }))
                return res
                    .status(400)
                    .send({ error: 'Schedule already exists' });

            const user = await User.findById(res.locals['user'].id);

            const createSchedule = await Schedule.create({ ...req.body, user: user._id});

            return res.send(createSchedule);
        } catch (err) {
            console.log(err)
            return res.status(400).send({ error: 'Schedule failed' });
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        return;
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        await Schedule.findByIdAndDelete(req.params.id);

        return res.status(200).send();
    }
}

export default new ScheduleController();
