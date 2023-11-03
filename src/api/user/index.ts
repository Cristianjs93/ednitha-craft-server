import { Router } from 'express';
import { createUserHandler } from './user.controller';

const router = Router();

router.post('/register', createUserHandler);

export default router;