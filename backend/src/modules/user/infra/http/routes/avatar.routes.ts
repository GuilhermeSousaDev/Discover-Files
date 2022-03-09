import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import AvatarController from '../controllers/AvatarController';

const avatarRouter = Router();

const avatarController = new AvatarController();
const multerConfig = multer();

avatarRouter.put(
    '/', 
    isAuthenticated,
    multerConfig.single('file'),
    avatarController.update,
);

export default avatarRouter;