/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { createUserHandler, getAllUsersHandler, getUserByEmailHandler, updateUserHandler } from './user.controller';

const router = Router();

router.post('/register', createUserHandler);
router.get('/', getAllUsersHandler);
router.get('/email', getUserByEmailHandler);
router.put('/update', updateUserHandler);

export default router;
