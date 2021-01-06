import express from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';

const userController = new UserController();
const authController = new AuthController();

const routes = express();
const upload = multer(uploadConfig);

routes.get('/users', userController.index);
routes.post('/users-create', userController.create);
routes.post('/find-user', userController.findById);
routes.post('/update-user/:id', userController.updateUser);
routes.patch('/users/avatar/:id', upload.single('avatar'), userController.updateAvatar);

routes.post('/auth', authController.create);
export default routes;