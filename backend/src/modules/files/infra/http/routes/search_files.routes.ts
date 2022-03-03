import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import SearchFilesController from '../controllers/SearchFilesController';

const searchFilesRouter = Router();

const searchFileController = new SearchFilesController();

searchFilesRouter.get(
    '/:category', 
    celebrate({
        [Segments.PARAMS]: {
            category: Joi.string().required(),
        }
    }),
    searchFileController.show,
);

searchFilesRouter.post(
    '/', 
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
        }
    }),
    searchFileController.index,
);

export default searchFilesRouter;