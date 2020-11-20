import { expect } from 'chai';
import 'mocha';
import User from '../../src/models/User';
import faker from 'faker';
import request from 'supertest';
import { server } from '../../src/app';

describe('Autenticação ', () => {
    it('Usuário deve realizar login com email e senha', async () => {
        const password = '12345678';

        const user = await User.create({
            name: faker.name.title(),
            email: faker.internet.email(),
            password,
        });

        const response = await request(server).post('/auth/login').send({
            email: user.email,
            password,
        });

        expect(response.status).to.equal(200);
    });

    it('Usuário errando a senha deve retornar 401', async () => {
        const user = await User.create({
            name: faker.name.title(),
            email: faker.internet.email(),
            password: '12345678',
        });

        const response = await request(server).post('/auth/login').send({
            email: user.email,
            password: 'senhaerrada',
        });

        expect(response.status).to.equal(401);
    });

    it('Usuário não cadastrado deve retornar 404', async () => {
        const response = await request(server).post('/auth/login').send({
            email: 'naocadastrado@email.com',
            password: '12345678',
        });

        expect(response.status).to.equal(404);
    });
});
