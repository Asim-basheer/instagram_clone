import express from 'express';
import { getUser, searchUsers } from '../controllers/user.js';

const router = express.Router();

router.get('/search', searchUsers);
router.get('/', getUser);

export default router;
