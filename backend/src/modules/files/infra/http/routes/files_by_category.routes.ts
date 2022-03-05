import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import FilesByCategoryController from '../controllers/FilesByCategoryController';

const filesByCategoryRouter = Router();
const filesByCategoryController = new FilesByCategoryController();

filesByCategoryRouter.get(
    '/:category', 
    celebrate({
        [Segments.PARAMS]: {
            category: Joi.string().required(),
        }
    }),
    filesByCategoryController.index,
);

export default filesByCategoryRouter;