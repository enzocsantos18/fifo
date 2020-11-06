import Router from '../router';
import UserController from '../controllers/UserController';

Router.get('/users', UserController.index);
Router.post('/users', UserController.create);