import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(router);

app.listen(3333);
