/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { createUserHandler, getAllUsersHandler, getUserByEmailHandler } from './user.controller';

const router = Router();

router.post('/register', createUserHandler);
router.get('/', getAllUsersHandler);
router.get('/email', getUserByEmailHandler);

export default router;
