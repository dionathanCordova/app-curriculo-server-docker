import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import UserController from '../controllers/UserController';
const userController = new UserController();

const userRoutes = Router();
const upload = multer(uploadConfig);

userRoutes.get('/', userController.index);
userRoutes.post('/create', userController.create);
userRoutes.post('/find-by-id', userController.findById);
userRoutes.post('/update/:id', userController.updateUser);
userRoutes.patch('/users/avatar/:id', upload.single('avatar'), userController.updateAvatar);

export default userRoutes;