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
            station: Yup.string().required('Estação deve ser selecionada'),
            game: Yup.string().required('Jogo deve ser selecionado'),
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

        const { station, game } = req.body;

        try {
            const user = await User.findById(res.locals['user'].id);

            const schedule = await Schedule.create({
                date: moment().toDate(),
                station,
                game,
                user,
            });

            const createdSchedule = await Schedule.findById(schedule._id)
                .populate('game')
                .populate('user');

            socket.to(station).emit('schedule-create', {
                schedule: createdSchedule,
            });

            return res.json(createdSchedule);
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
