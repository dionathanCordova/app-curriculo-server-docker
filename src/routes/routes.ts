import express from 'express';
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';

const userController = new UserController();
const authController = new AuthController();

const routes = express();

routes.get('/', (req, res) => {
    return res.json('teste 222');
})

routes.get('/users', userController.index);
routes.post('/users-create', userController.create);
routes.post('/find-user', userController.findById);

routes.post('/auth', authController.create);
export default routes;