import {Router} from 'express';
import { createPost, deletePost, getPostById, getPosts, seearchPost, updatePost, } from '../controller/postController.js';


const router = Router();

router.post('/', createPost);
router.put('/:id',updatePost);
router.get('/', getPosts);
router.get('/search', seearchPost);
router.get('/:id', getPostById);
router.delete('/:id',deletePost);

export default router;