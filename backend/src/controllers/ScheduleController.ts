import { Request, Response } from 'express';
import Schedule from '../models/Schedule';
import Station from '../models/Station';
import User from '../models/User';
import * as Yup from 'yup';
import moment from 'moment';
import { socket } from '../app';

class ScheduleController {
    public async index(req: Request, res: Response): Promise<Response> {
        const user = await User.findById(res.locals['user'].id);

        const schedules = await Schedule.find({
            user,
        })
            .sort({ date: 'asc' })
            .select('-user')
            .populate('game')
            .populate('station');

        return res.json(schedules);
    }

    public async indexByStation(
        req: Request,
        res: Response
    ): Promise<Response> {
        const station = await Station.findById(req.params.id);

        if (!station)
            return res.status(404).send({ error: 'Estação não encontrada' });

        const schedules = await Schedule.find({
            station,
        })
            .sort({ date: 'asc' })
            .populate('user')
            .populate('game');

        return res.json(schedules);
    }

    public async indexByStationAndDay(
        req: Request,
        res: Response
    ): Promise<Response> {
        const station = await Station.findById(req.params.id);

        if (!station)
            return res.status(404).send({ error: 'Estação não encontrada' });

        const { day } = req.body;

        if (!day) {
            return res
                .status(400)
                .send({ error: 'O dia deve ser especificado' });
        }

        const currentDate = moment().startOf('day');

        currentDate.set('date', day);

        const schedules = await Schedule.find({
            station,
            date: {
                $gte: currentDate.toDate(),
                $lte: currentDate.endOf('day').toDate(),
            },
        })
            .sort({ date: 'asc' })
            .populate('user')
            .populate('game');

        return res.json(schedules);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const schema = Yup.object().shape({
            date: Yup.date().required('Data deve ser inserida'),
            station: Yup.string().required('Estação deve ser selecionada'),
            game: Yup.string().required('Jogo deve ser selecionado'),
            time: Yup.number()
                .positive('O tempo precisa ser positivo')
                .oneOf(
                    [15, 30, 45, 60],
                    'O tempo precisa ser 15, 30, 45 ou 60 minutos'
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
                station,
            }).select('date');

            const previousSchedule = await Schedule.findOne({
                date: { $lte: date },
                station,
            }).select('date time');

            if (nextSchedule) {
                const currentDate = moment(date);
                const nextDate = moment(nextSchedule.date);

                currentDate.add(time, 'minutes');

                if (currentDate > nextDate) {
                    return res.status(400).send({
                        error: 'Agendamento inválido, horário indisponível',
                    });
                }
            }

            if (previousSchedule) {
                const currentDate = moment(date);
                const previousDate = moment(previousSchedule.date);

                previousDate.add(Number(previousSchedule.time), 'minutes');

                if (previousDate > currentDate) {
                    return res.status(400).send({
                        error: 'Agendamento inválido, horário indisponível',
                    });
                }
            }

            if (await Schedule.findOne({ date, station }))
                return res.status(400).send({ error: 'Agendamento já existe' });

            const user = await User.findById(res.locals['user'].id);

            const schedule = await Schedule.create({
                date,
                station,
                game,
                user,
                time,
            });

            socket.to(station).emit('schedule-create', { schedule });

            return res.json(schedule);
        } catch (err) {
            return res.status(400).send({ error: 'Falha no agendamento' });
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const user = await User.findById(res.locals['user'].id);

        try {
            const schedule = await Schedule.findOne({
                user,
                _id: req.params.id,
            }).populate('station');

            if (!schedule) {
                return res
                    .status(404)
                    .send({ error: 'Agendamento não encontrado' });
            }

            await schedule.deleteOne();

            socket
                .to(schedule.station._id.toString())
                .emit('schedule-delete', { id: schedule._id });

            return res.status(201).send('Agendamento excluído.');
        } catch (err) {
            return res
                .status(400)
                .send({ error: 'Erro ao excluir o agendamento.' });
        }
    }
}

export default new ScheduleController();
