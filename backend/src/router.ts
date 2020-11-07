import { Router } from 'express';
import GameController from './controllers/GameController';
import UserController from './controllers/UserController';
import ScheduleController from './controllers/ScheduleController';

const router = Router();

router.post('/users', UserController.create);

router.get('/games', GameController.index);
router.post('/games', GameController.create);

router.get('/schedules', ScheduleController.index);
router.post('/schedules', ScheduleController.create);
router.patch('/schedules', ScheduleController.update);
router.delete('/schedules', ScheduleController.delete);

export default router;
