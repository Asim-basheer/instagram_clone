import express from 'express';
import { getLikes, likeAndUnlike } from '../controllers/like.js';

const router = express.Router();

router.post('/', likeAndUnlike);
router.get('/', getLikes);

export default router;
