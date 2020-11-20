import { expect } from 'chai';
import 'mocha';
import User, { IUser } from '../../src/models/User';
import faker from 'faker';
import request from 'supertest';
import { server } from '../../src/app';

describe('Usuário', () => {
    let authUser: IUser;
    let authToken: string;
    const password = '12345678';

    before(async () => {
        authUser = await User.create({
            name: 'Usuário autenticado',
            email: 'autenticado@email.com',
            password,
        });

        const response = await request(server).post('/auth/login').send({
            email: authUser.email,
            password,
        });

        const data = JSON.parse(response.text);

        authToken = data['token'];
    });

    it('Usuário autenticado deve retornar seus dados', async () => {
        const response = await request(server)
            .get('/users')
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.status).to.equal(200);
    });

    it('Usuário autenticado deve trocar a senha', async () => {
        await request(server)
            .post('/users/changePassword')
            .send({
                password,
                newPassword: 'novasenha',
                confirmPassword: 'novasenha',
            })
            .set('Authorization', `Bearer ${authToken}`);

        const response = await request(server).post('/auth/login').send({
            email: authUser.email,
            password: 'novasenha',
        });

        expect(response.status).to.equal(200);
    });

    it('Usuário deve se cadastrar', async () => {
        const email = faker.internet.email();

        await request(server)
            .post('/users')
            .set('Content-type', 'multipart/form-data')
            .field('name', faker.name.title())
            .field('email', email)
            .field('password', password);

        const user = await User.find({ email });

        expect(user).to.have.lengthOf(1);
    });
});
