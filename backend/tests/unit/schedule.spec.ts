import { expect } from 'chai';
import 'mocha';
import User, { IUser } from '../../src/models/User';
import request from 'supertest';
import { server } from '../../src/app';
import Station, { IStation } from './../../src/models/Station';
import { GameModel as Game, IGame } from './../../src/models/Game';
import moment from 'moment';
import Schedule from '../../src/models/Schedule';

describe('Agendamento', () => {
    let authUser: IUser;
    let authToken: string;

    let defaultStation: IStation;
    let defaultGame: IGame;

    before(async () => {
        defaultStation = await Station.create({
            name: 'Estação padrão',
        });

        defaultGame = await Game.create({
            name: 'Jogo padrão',
            imageURL: 'linkdojogo',
        });

        authUser = await User.create({
            name: 'Usuário agendador',
            email: 'agendador@email.com',
            password: '12345678',
        });

        const response = await request(server).post('/auth/login').send({
            email: authUser.email,
            password: '12345678',
        });

        const data = JSON.parse(response.text);

        authToken = data['token'];
    });

    it('Usuário autenticado deve criar um agendamento', async () => {
        const date = moment().format('YYYY-MM-DD HH:mm');

        await request(server)
            .post('/schedules')
            .send({
                date,
                station: defaultStation._id,
                game: defaultGame._id,
                time: 30,
            })
            .set('Authorization', `Bearer ${authToken}`);

        const schedules = await Schedule.find({ user: authUser._id });

        expect(schedules).to.have.lengthOf(1);
    });

    it('Usuário autenticado não pode agendar no mesmo horário de outra pessoa', async () => {
        const schedule = await Schedule.findOne();

        const response = await request(server)
            .post('/schedules')
            .send({
                date: schedule.date,
                station: defaultStation._id,
                game: defaultGame._id,
                time: 30,
            })
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.status).to.equal(400);
    });

    it('Usuário autenticado não pode agendar num horário que irá exceder o horário de outra pessoa', async () => {
        const schedule = await Schedule.findOne();
        const scheduleDate = moment(schedule.date);

        scheduleDate.subtract(15, 'minutes');

        const response = await request(server)
            .post('/schedules')
            .send({
                date: scheduleDate,
                station: defaultStation._id,
                game: defaultGame._id,
                time: 30,
            })
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.status).to.equal(400);
    });

    it('Usuário autenticado não pode agendar num horário que já está reservado para outra pessoa', async () => {
        const schedule = await Schedule.findOne();
        const scheduleDate = moment(schedule.date);

        scheduleDate.add(15, 'minutes');

        const response = await request(server)
            .post('/schedules')
            .send({
                date: scheduleDate,
                station: defaultStation._id,
                game: defaultGame._id,
                time: 30,
            })
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.status).to.equal(400);
    });

    it('Usuário autenticado deve ver seus agendamentos', async () => {
        const response = await request(server)
            .get('/schedules')
            .set('Authorization', `Bearer ${authToken}`);

        const data = JSON.parse(response.text);

        expect(data).to.have.length.gte(0);
    });

    it('Usuário autenticado pode excluir um agendamento', async () => {
        const schedule = await Schedule.findOne({ user: authUser._id });

        await request(server)
            .delete(`/schedules/${schedule._id}`)
            .set('Authorization', `Bearer ${authToken}`);

        const exists = await Schedule.exists({ _id: schedule._id });

        expect(exists).to.equal(false);
    });

    it('Usuário pode ver os agendamentos realizados por estação', async () => {
        const response = await request(server).get(
            `/schedules/${defaultStation._id}`
        );

        const data = JSON.parse(response.text);

        expect(data).to.have.length.gte(0);
    });

    it('Usuário pode ver os agendamentos realizados por estação e por dia', async () => {
        const date = moment().date();

        const response = await request(server)
            .post(`/schedules/${defaultStation._id}`)
            .send({
                day: date,
            });

        const data = JSON.parse(response.text);

        expect(data).to.have.length.gte(0);
    });
});
