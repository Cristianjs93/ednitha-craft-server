import { Router } from 'express';

import { loginHandler, verifyAccountHandler } from './local.controller';

const router = Router();

router.post('/login', loginHandler);
router.get('/verify/:resetToken', verifyAccountHandler);

export default router;
