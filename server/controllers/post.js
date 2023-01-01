import { db } from '../connect.js';
import jwt from 'jsonwebtoken';
import {
  addNotification,
  deleteNotifications,
} from '../helpers/notifications.js';

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not logged in!');
  const caption = req.body.caption;
  const image = req.body.image;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');
    const insertQuery =
      'INSERT INTO posts (user_id, caption, image) VALUES (?, ?, ?)';
    db.query(insertQuery, [userInfo.id, caption, image], (error, result) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
      } else {
        res.send({ message: 'post added' });

        db.query(
          'SELECT u.id as userId FROM users u LEFT JOIN followers f on (u.id = f.follower_id) WHERE f.followed_id = ?;',
          [userInfo.id],
          (error, results) => {
            if (error) {
              console.log(error);
            }

            results.map(({ userId }) => {
              addNotification(userId, 'post', result.insertId);
            });
          }
        );
      }
    });
  });
};

export const editPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not logged in!');
  const postId = req.params.postId;
  const caption = req.body.caption;
  const image = req.body.image;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');
    const editQuery =
      'UPDATE posts SET caption = ?, image = ? WHERE id = ? AND user_id = ?';
    db.query(editQuery, [caption, image, postId, userInfo.id], (error) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
      }

      res.send({ message: 'post edited' });
    });
  });
};

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not logged in!');
  const userId = req.query.userId;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    const q = `SELECT p.*, u.id AS userId, username, profile_picture FROM posts AS p JOIN users AS u ON (u.id = p.user_id) WHERE u.id = ? ORDER BY p.created_at DESC`;

    db.query(q, [userId === undefined ? userInfo.id : userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};
export const getTimeline = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not logged in!');
  const userId = req.query.userId;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    const q =
      'SELECT p.*, u.id AS userId, username, profile_picture FROM posts AS p JOIN users AS u ON (u.id = p.user_id) LEFT JOIN followers AS f ON (p.user_id = f.followed_id) WHERE f.follower_id = ? OR p.user_id = ? ORDER BY p.created_at DESC';

    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not logged in!');
  const postId = req.params.postId;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    const deleteQuery = `
 DELETE p, c, l FROM posts p LEFT JOIN comments c ON c.post_id = p.id LEFT JOIN likes l ON l.post_id = p.id WHERE p.id = ? AND p.user_id = ?
`;
    db.query(deleteQuery, [postId, userInfo.id], (error) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
      } else {
        res.send({ message: 'Post deleted' });

        db.query(
          'SELECT u.id as userId FROM users u LEFT JOIN followers f on (u.id = f.follower_id) WHERE f.followed_id = ?;',
          [userInfo.id],
          (error, results) => {
            if (error) {
              console.log(error);
            }

            results.map(({ userId }) => {
              deleteNotifications(userId, postId);
            });
          }
        );
      }
    });
  });
};
