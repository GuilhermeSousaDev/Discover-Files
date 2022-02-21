import filesRouter from '@modules/files/infra/http/routes/files.routes';
import avatarRouter from '@modules/user/infra/http/routes/avatar.routes';
import sessionRouter from '@modules/user/infra/http/routes/session.routes';
import userRouter from '@modules/user/infra/http/routes/user.routes';
import { Router } from 'express';

const router = Router();

router.use('/user', userRouter);
router.use('/avatar', avatarRouter);
router.use('/login', sessionRouter);

router.use('/files', filesRouter);

export default router;