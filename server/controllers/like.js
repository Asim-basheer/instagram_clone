import { db } from '../connect.js';
import jwt from 'jsonwebtoken';
import {
  addNotification,
  deleteNotifications,
} from '../helpers/notifications.js';

export const likeAndUnlike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not logged in!');
  const { postId } = req.body;
  const { userId } = req.body;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    // Check if the user has already liked the post
    const query = 'SELECT * FROM likes WHERE post_id = ? AND user_id = ?';

    db.query(query, [postId, userInfo.id], (error, results) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
      } else if (results.length > 0) {
        // User has already liked the post, remove the like
        const query = 'DELETE FROM likes WHERE post_id = ? AND user_id = ?';
        db.query(query, [postId, userInfo.id], (error, result) => {
          if (error) {
            console.error(error);
            res.sendStatus(500);
          } else {
            res.send({ message: 'Like removed' });

            deleteNotifications(userId, results[0].id);
          }
        });
      } else {
        // User has not liked the post, add the like
        const query = 'INSERT INTO likes (post_id, user_id) VALUES (?, ?)';
        db.query(query, [postId, userInfo.id], (error, result) => {
          if (error) {
            console.error(error);
            res.sendStatus(500);
          } else {
            res.send({ message: 'Like added' });

            addNotification(userId, 'like', result.insertId);
          }
        });
      }
    });
  });
};

export const getLikes = (req, res) => {
  const q = `SELECT l.*, u.id AS userId, username, profile_picture FROM likes AS l JOIN users AS u ON (u.id = l.user_id)
        WHERE l.post_id = ? 
        `;
  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
