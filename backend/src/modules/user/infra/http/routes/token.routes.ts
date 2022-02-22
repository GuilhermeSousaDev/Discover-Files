import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import TokenController from '../controllers/tokenController';

const tokenRouter = Router();

const tokenController = new TokenController();

tokenRouter.post(
    '/', 
    isAuthenticated,
    tokenController.index,
);

export default tokenRouter;