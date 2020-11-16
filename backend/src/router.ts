import { Router } from 'express';
import GameController from './controllers/GameController';
import UserController from './controllers/UserController';
import ScheduleController from './controllers/ScheduleController';
import AuthController from './controllers/AuthController';
import StationController from './controllers/StationController';
import AuthMiddleware from './middlewares/auth';
import Storage from './config/storage';

const router = Router();

router.post('/users', UserController.create);
router.post('/users/forgotpassword', UserController.forgotPassowrd);
router.post('/users/changepassword', AuthMiddleware, UserController.changePassword);
router.delete('/users', AuthMiddleware, UserController.deleteUser);

router.get('/games', GameController.index);
router.post('/games', [Storage.single('image')], GameController.create);
router.post('/games/stations', StationController.create);
router.get('/games/:id/stations', StationController.indexByGame);

router.get('/schedules', AuthMiddleware, ScheduleController.index);
router.post('/schedules', AuthMiddleware, ScheduleController.create);
router.delete('/schedules/:id', AuthMiddleware, ScheduleController.delete);

router.post('/auth/login', AuthController.login);
router.post('/auth/logout', AuthController.logout);

export default router;
