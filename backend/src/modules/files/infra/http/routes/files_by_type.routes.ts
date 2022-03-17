import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ListFilesByTypeController from '../controllers/ListFilesByTypeController';

const filesByTypeRouter = Router();
const listFilesByTypeController = new ListFilesByTypeController();

filesByTypeRouter.get(
    '/:type',
    celebrate({
        [Segments.PARAMS]: {
            type: Joi.string().required(),
        },
    }),
    listFilesByTypeController.index,
);

export default filesByTypeRouter;