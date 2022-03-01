import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import FilesController from '../controllers/FilesController';

const filesRouter = Router();

const filesController = new FilesController();
const multerConfig = multer();

filesRouter.get('/', filesController.index);

filesRouter.get(
    '/:id', 
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required(),
        }
    }),
    filesController.show,
);

filesRouter.post(
    '/', 
    isAuthenticated,
    multerConfig.single('file'),
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            description: Joi.string().required(),
            user: Joi.string().required(),
        }
    }),
    filesController.create,
);

filesRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required(),
        },
    }),
    filesController.delete,
);

export default filesRouter;