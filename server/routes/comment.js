import express from 'express';
import {
  addComment,
  deleteComment,
  editComment,
  getComments,
} from '../controllers/comment.js';

const router = express.Router();

router.get('/', getComments);
router.post('/', addComment);
router.put('/', editComment);
router.delete('/:commentId/:userId', deleteComment);

export default router;
