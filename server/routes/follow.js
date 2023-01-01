import express from 'express';
import {
  deleteFollower,
  followAndUnfollow,
  getFollowers,
} from '../controllers/follow.js';

const router = express.Router();

router.post('/', followAndUnfollow);
router.get('/', getFollowers);
router.delete('/:followedId', deleteFollower);

export default router;
