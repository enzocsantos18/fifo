import { Request, Response } from 'express';
import Schedule from '../models/Schedule';
import User from '../models/User';
import * as Yup from 'yup';
import moment from 'moment';

class ScheduleController {
    public async index(req: Request, res: Response): Promise<Response> {
        const user = await User.findById(res.locals['user'].id);

        const schedules = await Schedule.find({
            user,
        })
            .select('-user')
            .populate('game')
            .populate('station');

        return res.json(schedules);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const schema = Yup.object().shape({
            date: Yup.date().required('Date is required'),
            station: Yup.string().required('Station is required'),
            game: Yup.string().required('Game is required'),
            time: Yup.number()
                .positive('The time needs to be positive')
                .oneOf(
                    [15, 30, 45, 60],
                    'The time needs to be 15, 30, 45 or 60 minutes'
                ),
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

        const { date, station, game, time } = req.body;

        try {
            const nextSchedule = await Schedule.findOne({
                date: { $gte: date },
            }).select('date');

            const previousSchedule = await Schedule.findOne({
                date: { $lte: date },
            }).select('date time');

            if (nextSchedule) {
                const currentDate = moment(date);
                const nextDate = moment(nextSchedule.date);

                currentDate.add(time, 'minutes');

                if (currentDate > nextDate) {
                    return res
                        .status(400)
                        .send({ error: 'Invalid schedule time' });
                }
            }

            if (previousSchedule) {
                const currentDate = moment(date);
                const previousDate = moment(previousSchedule.date);

                previousDate.add(Number(previousSchedule.time), 'minutes');

                if (previousDate > currentDate) {
                    return res
                        .status(400)
                        .send({ error: 'Invalid schedule time' });
                }
            }

            if (await Schedule.findOne({ date }))
                return res
                    .status(400)
                    .send({ error: 'Schedule already exists' });

            const user = await User.findById(res.locals['user'].id);

            const schedule = await Schedule.create({
                date,
                station,
                game,
                user,
                time,
            });

            return res.json(schedule);
        } catch (err) {
            return res.status(400).send({ error: 'Schedule failed' });
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {

        const user = await User.findById(res.locals['user'].id);

        try {
                await Schedule.findOneAndDelete({
                user,
                _id: req.params.id
            });

            return res.status(201).send('Schedule deleted.');
        } catch(err) {
            return res.status(400).send({ err: 'Schedule not found.'})
        }


    }

    public async update(req: Request, res: Response): Promise<Response> {
        const schema = Yup.object().shape({
            date: Yup.date().required('Data é obrigatório.'),
            time: Yup.number()
                .positive('O Horário precisa ser positivo.')
                .oneOf(
                    [15, 30, 45, 60],
                    'O período precisa ser 15, 30, 45 ou 60 minutos.'
                ),
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

        const { date, time } = req.body;

        const idSchedule = req.params.id;

        try {
            const actualSchedule = await Schedule.findById(idSchedule);

            const previousSchedule = await Schedule.findOne({
                game: actualSchedule.game, 
                station: actualSchedule.station,
                date: { $lte: new Date(date) },
            });

            if(previousSchedule){
                let previousScheduleEnd = moment(previousSchedule.date)
                                        .add(previousSchedule.time as moment.DurationInputArg1, 'minutes');


                if (previousScheduleEnd >= moment(date)) {
                        return res
                            .status(400)
                            .send({ error: 'Conflito com o agendamento anterior. Escolha outro horário.' });
                }
            }

            const nextSchedule = await Schedule.findOne({
                game: actualSchedule.game, 
                station: actualSchedule.station,
                date: { $gte: new Date(date) },
            });

            if(nextSchedule){
                let newScheduleEnd = moment(date)
                                        .add(time as moment.DurationInputArg1, 'minutes');

                if (newScheduleEnd > moment(nextSchedule.date)) {
                    return res
                        .status(400)
                        .send({ error: 'Conflito com o próximo agendamento. Escolha outro horário.' });
                }
            }

            const schedule = await Schedule.findByIdAndUpdate(idSchedule, {
                date: date,
                time: time
            });

            return res.json(schedule);

        } catch (err) {
            return res.status(400).send({ error: 'Atualização do agendamento não realizado.' });
        }
    }
}

export default new ScheduleController();
