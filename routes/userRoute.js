import {Router} from 'express';
import { createUser, deleteUsers, getUsers, updateUser } from '../controller/userController.js';

const router = Router();

router.post('/', createUser);
router.put('/:id',updateUser);
router.get('/', getUsers);
router.delete('/:id',deleteUsers);

export default router;