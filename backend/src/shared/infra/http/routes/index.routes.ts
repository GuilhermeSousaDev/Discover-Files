import filesRouter from '@modules/files/infra/http/routes/files.routes';
import filesByCategoryRouter from '@modules/files/infra/http/routes/files_by_category.routes';
import searchFilesRouter from '@modules/files/infra/http/routes/search_files.routes';
import avatarRouter from '@modules/user/infra/http/routes/avatar.routes';
import sessionRouter from '@modules/user/infra/http/routes/session.routes';
import tokenRouter from '@modules/user/infra/http/routes/token.routes';
import userRouter from '@modules/user/infra/http/routes/user.routes';
import { Router } from 'express';

const router = Router();

router.use('/user', userRouter);
router.use('/avatar', avatarRouter);
router.use('/token', tokenRouter);
router.use('/login', sessionRouter);

router.use('/files', filesRouter);
router.use('/files/search', searchFilesRouter);
router.use('/files/category', filesByCategoryRouter);

export default router;