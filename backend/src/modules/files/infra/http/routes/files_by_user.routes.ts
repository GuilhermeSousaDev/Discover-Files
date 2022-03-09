import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { Router } from 'express';
import ListFilesByUserController from '../controllers/ListFilesByUserController';

const filesByUserRouter = Router();
const listFilesByUserController = new ListFilesByUserController();

filesByUserRouter.get(
    '/:id', 
    isAuthenticated,
    listFilesByUserController.index,
);

export default filesByUserRouter;