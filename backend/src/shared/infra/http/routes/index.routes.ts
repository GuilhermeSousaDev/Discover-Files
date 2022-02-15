import sessionRouter from '@modules/user/infra/http/routes/session.routes';
import userRouter from '@modules/user/infra/http/routes/user.routes';
import { Router } from 'express';

const router = Router();

router.use('/user', userRouter);
router.use('/login', sessionRouter);

export default router;