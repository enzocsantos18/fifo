import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './router';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(router);
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.listen(process.env['SERVER_PORT']);
