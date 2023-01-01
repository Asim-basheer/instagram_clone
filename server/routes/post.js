import express from 'express';
import {
  addPost,
  editPost,
  deletePost,
  getPosts,
  getTimeline,
} from '../controllers/post.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', addPost);
router.put('/:postId', editPost);
router.delete('/:postId', deletePost);
router.get('/timeline', getTimeline);

export default router;
