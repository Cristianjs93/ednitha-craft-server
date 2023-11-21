import { Router } from 'express';
import {
  createUserHandler,
  getAllUsersHandler,
  getUserByEmailHandler,
  updateUserHandler,
  deleteUserHandler
} from './user.controller';
import { isAuthenticated } from '../../auth/auth.controller';

const router = Router();

router.post('/register', createUserHandler);
router.get('/', isAuthenticated, getAllUsersHandler);
router.get('/email', getUserByEmailHandler);
router.put('/update', updateUserHandler);
router.delete('/delete', deleteUserHandler);

export default router;
