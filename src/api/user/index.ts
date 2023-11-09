/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { createUserHandler, getAllUsersHandler } from './user.controller';

const router = Router();

router.post('/register', createUserHandler);
router.get('/', getAllUsersHandler);

export default router;
