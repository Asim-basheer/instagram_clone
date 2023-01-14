import { db } from '../connect.js';
import jwt from 'jsonwebtoken';
import {
  addNotification,
  deleteNotifications,
} from '../helpers/notifications.js';

export const getComments = (req, res) => {
  const q = `SELECT c.*, u.username, u.profile_picture as profilePicture FROM comments AS c JOIN users AS u ON (u.id = c.user_id)
      WHERE c.post_id = ? ORDER BY c.created_at DESC
      `;
  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not logged in!');
  const postId = req.body.postId;
  const comment = req.body.comment;
  const userId = req.body.userId;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');
    const insertQuery =
      'INSERT INTO comments (post_id, user_id, comment) VALUES (?, ?, ?)';
    db.query(insertQuery, [postId, userInfo.id, comment], (error, result) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
      } else {
        res.send({ message: 'comment added' });

        addNotification(userId, 'comment', result.insertId);
      }
    });
  });
};
export const editComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not logged in!');

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    const commentId = req.body.commentId;
    const comment = req.body.comment;

    db.query(
      'UPDATE comments SET comment = ? WHERE id = ? AND user_id = ?',
      [comment, commentId, userInfo.id],
      (error, results) => {
        if (error) {
          console.error(error);
          res.sendStatus(500);
        } else {
          res.status(200).send({ message: 'comment edited' });
        }
      }
    );
  });
};
export const deleteComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not logged in!');
  const commentId = req.params.commentId;
  const userId = req.params.userId;
  const deleteQuery =
    'DELETE FROM comments  WHERE comments.id = ? AND comments.user_id = ?';

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');
    db.query(deleteQuery, [commentId, userInfo.id], (error) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
      } else {
        res.send({ message: 'comment deleted' });

        deleteNotifications(userId, commentId);
      }
    });
  });
};
