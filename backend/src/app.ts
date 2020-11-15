import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './router';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(router);
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.listen(3333);
