import { Router } from 'express';
import {
  createUserHandler,
  getAllUsersHandler,
  getUserByEmailHandler,
  updateUserHandler,
  deleteUserHandler
} from './user.controller';

const router = Router();

router.post('/register', createUserHandler);
router.get('/', getAllUsersHandler);
router.get('/email', getUserByEmailHandler);
router.put('/update', updateUserHandler);
router.delete('/delete', deleteUserHandler);

export default router;
