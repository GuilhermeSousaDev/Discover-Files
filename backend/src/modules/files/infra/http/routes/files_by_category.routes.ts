import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ListFilesByCategoryController from '../controllers/ListFilesByCategoryController';

const filesByCategoryRouter = Router();
const listFilesByCategoryController = new ListFilesByCategoryController();

filesByCategoryRouter.get(
    '/:category', 
    celebrate({
        [Segments.PARAMS]: {
            category: Joi.string().required(),
        }
    }),
    listFilesByCategoryController.index,
);

export default filesByCategoryRouter;