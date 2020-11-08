import { Router } from 'express';
import GameController from './controllers/GameController';
import UserController from './controllers/UserController';
import ScheduleController from './controllers/ScheduleController';
import AuthController from './controllers/AuthController';

import AuthMiddleware from './middlewares/auth';

const router = Router();

router.post('/users', UserController.create);

router.get('/games', GameController.index);
router.post('/games', GameController.create);

router.get('/schedules', ScheduleController.index);
router.post('/schedules', ScheduleController.create);
router.patch('/schedules/:id', ScheduleController.update);
router.delete('/schedules/:id', ScheduleController.delete);

router.post('/auth/login', AuthController.login);
router.post('/auth/logout', AuthController.logout);

export default router;
