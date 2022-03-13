import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import IncrementDownloadController from '../controllers/IncrementDownloadController';

const incrementDownloadRouter = Router();
const incrementDownloadController = new IncrementDownloadController();

incrementDownloadRouter.post(
    '/', 
    celebrate({
        [Segments.BODY]: {
            file_id: Joi.number().required(),
        },
    }),
    incrementDownloadController.index,
);

export default incrementDownloadRouter;