import express from 'express';
import cors from 'cors';

import Router from './router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(Router);

app.listen(3333);
