import {Router} from 'express';
import {  } from '../controller/postController.js';
import { createComment, deleteComment, getComment, getComments, updateComment } from '../controller/commentController.js';


const router = Router();

router.post('/', createComment);
router.put('/:id',updateComment);
router.get('/', getComments);
router.get('/:id', getComment);
router.delete('/:id',deleteComment);

export default router;