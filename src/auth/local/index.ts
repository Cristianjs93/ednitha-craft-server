import { Router } from 'express';

import { loginHandler } from './local.controller';

const router = Router();

router.post('/login', loginHandler);

export default router;
