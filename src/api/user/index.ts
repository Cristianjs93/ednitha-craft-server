import { Router } from 'express';
import {
  createUserHandler,
  getAllUsersHandler,
  getUserByEmailHandler,
  updateUserHandler,
  deleteUserHandler
} from './user.controller';
import { hasRole, isAuthenticated } from '../../auth/auth.controller';
import { formDataProccesor } from '../../middlewares/formDataProccesor';

const router = Router();

router.post('/register', formDataProccesor, createUserHandler);
router.get('/', isAuthenticated, hasRole(['ADMIN']), getAllUsersHandler);
router.get('/email', isAuthenticated, hasRole(['ADMIN']), getUserByEmailHandler);
router.put('/update', isAuthenticated, hasRole(['USER', 'ADMIN']), formDataProccesor, updateUserHandler);
router.delete('/delete', isAuthenticated, hasRole(['USER', 'ADMIN']), deleteUserHandler);

export default router;
