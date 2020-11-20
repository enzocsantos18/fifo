import { expect } from 'chai';
import 'mocha';
import User, { IUser } from '../../src/models/User';
import request from 'supertest';
import { server } from '../../src/app';
import Station, { IStation } from './../../src/models/Station';

describe('Jogo', async () => {
    let authUser: IUser;
    let authToken: string;

    let defaultStation: IStation;

    before(async () => {
        defaultStation = await Station.create({
            name: 'Estação padrão',
        });

        authUser = await User.create({
            name: 'Usuário criador de jogos',
            email: 'criador@email.com',
            password: '12345678',
            isAdmin: true,
        });

        const response = await request(server).post('/auth/login').send({
            email: authUser.email,
            password: '12345678',
        });

        const data = JSON.parse(response.text);

        authToken = data['token'];
    });

    it('Usuário pode visualizar os jogos', async () => {
        const response = await request(server).get(`/games/`);

        const data = JSON.parse(response.text);

        expect(data).to.have.lengthOf.gte(0);
    });

    /*
     * VALIDAR IMAGEM
     *   
    it('Usuário administrador pode criar um jogo', async () => {
        const response = await request(server)
            .post('/games')
            .set('Content-type', 'multipart/form-data')
            .set('Authorization', `Bearer ${authToken}`)
            .field('name', 'Meu jogo')
            .field('stations', `["${defaultStation._id}"]`)
            .attach('image', null)
    });*/
});
