import { Router } from 'express';
import {
  createUserHandler,
  getAllUsersHandler,
  getUserByEmailHandler,
  updateUserHandler,
  deleteUserHandler
} from './user.controller';
import { hasRole, isAuthenticated } from '../../auth/auth.controller';

const router = Router();

router.post('/register', createUserHandler);
router.get('/', isAuthenticated, hasRole(['ADMIN']), getAllUsersHandler);
router.get('/email', isAuthenticated, hasRole(['ADMIN']), getUserByEmailHandler);
router.put('/update', isAuthenticated, hasRole(['USER', 'ADMIN']), updateUserHandler);
router.delete('/delete', isAuthenticated, hasRole(['USER', 'ADMIN']), deleteUserHandler);

export default router;
