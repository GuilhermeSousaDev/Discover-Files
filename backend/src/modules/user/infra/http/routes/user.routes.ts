import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();

const userController = new UserController();

userRouter.get('/', isAuthenticated, userController.index);
userRouter.get(
    '/:id', 
    isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required(),
        }
    }),
    userController.show,
);

userRouter.post(
    '/', 
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }
    }),
    userController.create,
);

userRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            old_password: Joi.string().required(),
            password: Joi.string().required(),
            password_confirmation: Joi.string()
                .valid(Joi.ref('password'))
                .when('password', {
                    is: Joi.exist(),
                    then: Joi.required(),
                }),
        },
    }), 
    isAuthenticated,
    userController.update,
);

userRouter.delete( 
    '/:id', 
    isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required(),
        }
    }),
    userController.delete,
);

export default userRouter;