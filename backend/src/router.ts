import { Router } from 'express';
import GameController from './controllers/GameController';
import UserController from './controllers/UserController';
import ScheduleController from './controllers/ScheduleController';
import AuthController from './controllers/AuthController';
import StationController from './controllers/StationController';
import AuthMiddleware from './middlewares/auth';
import AdminMiddleware from './middlewares/admin';
import { GameBannerStorage, UserAvatarStorage } from './config/storage';

const router = Router();

//Users
router.get('/users', AuthMiddleware, UserController.index);
router.post(
    '/users',
    [UserAvatarStorage.single('image')],
    UserController.create
);
router.post('/users/forgotpassword', UserController.forgotPassword);
router.post('/users/resetpassword/:id', UserController.resetPassword);

router.post(
    '/users/changepassword',
    AuthMiddleware,
    UserController.changePassword
);
router.post('/users/delete', AuthMiddleware, UserController.destroy);
router.patch(
    '/users',
    [UserAvatarStorage.single('image'), AuthMiddleware],
    UserController.update
);

//Games
router.get('/games', GameController.index);
router.post(
    '/games',
    [GameBannerStorage.single('image'), AuthMiddleware, AdminMiddleware],
    GameController.create
);
router.patch(
    '/games/:id',
    [GameBannerStorage.single('image'), AuthMiddleware, AdminMiddleware],
    GameController.update
);

router.get('/games/:id/stations', StationController.indexByGame);
router.delete(
    '/games/:id',
    [AuthMiddleware, AdminMiddleware],
    GameController.destroy
);

//Stations
router.get('/stations', StationController.index);
router.post(
    '/stations',
    [AuthMiddleware, AdminMiddleware],
    StationController.create
);
router.patch(
    '/stations/:id',
    [AuthMiddleware, AdminMiddleware],
    StationController.update
);
router.delete(
    '/stations/:id',
    [AuthMiddleware, AdminMiddleware],
    StationController.destroy
);

//Schedules
router.get('/schedules', AuthMiddleware, ScheduleController.index);
router.get('/schedules/:id', ScheduleController.indexByStation);
router.post('/schedules/:id', ScheduleController.indexByStationAndDay);
router.post('/schedules', AuthMiddleware, ScheduleController.create);
router.delete('/schedules/:id', AuthMiddleware, ScheduleController.delete);

//Auth
router.post('/auth/login', AuthController.login);
router.post('/auth/logout', AuthController.logout);

export default router;
