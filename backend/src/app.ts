import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './router';
import path from 'path';
import { createServer } from 'http';
import { createSocket } from './socket';

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(router);
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

const server = createServer(app);

export const socket = createSocket(server);

server.listen(process.env['SERVER_PORT']);
