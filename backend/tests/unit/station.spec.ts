import { expect } from 'chai';
import 'mocha';
import User, { IUser } from '../../src/models/User';
import request from 'supertest';
import { server } from '../../src/app';
import Station, { IStation } from './../../src/models/Station';
import {
    GameModel as Game,
    GameStationModel as GameStation,
    IGame,
} from './../../src/models/Game';

describe('Estação', async () => {
    let authUser: IUser;
    let authToken: string;

    let defaultStation: IStation;
    let defaultGame: IGame;

    before(async () => {
        defaultStation = await Station.create({
            name: 'Estação padrão',
        });

        defaultGame = await Game.create({
            name: 'Jogo da estação padrão',
            imageURL: 'imagemdojogo',
        });

        authUser = await User.create({
            name: 'Usuário criador de estação',
            email: 'jogador@email.com',
            password: '12345678',
            isAdmin: true,
        });

        await GameStation.create({
            game: defaultGame,
            station: defaultStation,
        });

        const response = await request(server).post('/auth/login').send({
            email: authUser.email,
            password: '12345678',
        });

        const data = JSON.parse(response.text);

        authToken = data['token'];
    });

    it('Usuário deve visualizar as estações por jogo', async () => {
        const response = await request(server).get(
            `/games/${defaultGame._id}/stations`
        );

        const data = JSON.parse(response.text);

        expect(data).to.have.lengthOf.greaterThan(0);
    });

    it('Usuário administrador pode criar uma estação', async () => {
        const response = await request(server)
            .post(`/games/stations`)
            .send({
                name: 'Estação criada',
            })
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.status).to.equal(200);
    });
});
