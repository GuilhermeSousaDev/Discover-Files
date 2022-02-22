import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ListFileByNameController from '../controllers/ListFileByNameController';

const listFilesRouter = Router();

const listFilesController = new ListFileByNameController();

listFilesRouter.post(
    '/', 
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
        }
    }),
    listFilesController.index,
);

export default listFilesRouter;