import { db } from '../connect.js';
import jwt from 'jsonwebtoken';
import {
  addNotification,
  deleteNotifications,
} from '../helpers/notifications.js';
export const followAndUnfollow = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not logged in!');

  const { followerId } = req.body;
  // Check if the user has already following the user
  const query =
    'SELECT * FROM followers WHERE follower_id = ? AND followed_id = ?';

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');
    db.query(query, [userInfo.id, followerId], (error, results) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
      } else if (results.length > 0) {
        // User has already followed the user, remove the follow
        const query =
          'DELETE FROM followers WHERE follower_id = ? AND followed_id = ?';
        db.query(query, [userInfo.id, followerId], (error) => {
          if (error) {
            console.error(error);
            res.sendStatus(500);
          } else {
            res.send({ message: 'delete' });

            deleteNotifications(followerId, userInfo.id);
          }
        });
      } else {
        // User has not followed the user, add the user
        const query =
          'INSERT INTO followers (follower_id, followed_id ) VALUES (?, ?)';
        db.query(query, [userInfo.id, followerId], (error, result) => {
          if (error) {
            console.error(error);
            res.sendStatus(500);
          } else {
            res.send({ message: 'insert' });

            addNotification(followerId, 'follow', userInfo.id);
          }
        });
      }
    });
  });
};

export const getFollowers = (req, res) => {
  const userId = req.query.userId;
  const type = req.query.type;
  const q =
    type === 'following'
      ? `SELECT u.id, u.username, u.profile_picture FROM followers f JOIN users u ON u.id = f.followed_id WHERE f.follower_id = ? ORDER BY u.username`
      : `SELECT u.id, u.username, u.profile_picture  FROM followers f JOIN users u ON u.id = f.follower_id WHERE f.followed_id = ? ORDER BY u.username`;

  db.query(q, [userId], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    }

    res.status(200).send(result);
  });
};

export const deleteFollower = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not logged in!');

  const followedId = req.params.followedId;

  const q = 'DELETE FROM followers WHERE follower_id = ? AND followed_id = ?';
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    db.query(q, [userInfo.id, followedId], (error) => {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      }
      res.status(200).send({ message: 'followed deleted' });
    });
  });
};
