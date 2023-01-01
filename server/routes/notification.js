import express from 'express';
import {
  getNotifications,
  addSeenTonNotifications,
} from '../controllers/notification.js';

const router = express.Router();

router.get('/', getNotifications);
router.put('/', addSeenTonNotifications);

export default router;
