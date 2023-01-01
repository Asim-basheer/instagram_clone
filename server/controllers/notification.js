import { db } from '../connect.js';
import jwt from 'jsonwebtoken';

export const getNotifications = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not logged in!');

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    const likePromise = new Promise((resolve, reject) => {
      db.query(
        'SELECT DISTINCT n.id, n.action, n.created_at, n.seen, n.user_id,  l.id AS toRef,  u.full_name FROM notifications AS n JOIN likes AS l JOIN users AS u ON (n.item_id = l.id) AND (n.user_id = ?) AND (l.user_id = u.id)',
        [userInfo.id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
    const followPromise = new Promise((resolve, reject) => {
      db.query(
        'SELECT DISTINCT  n.id, n.action, n.created_at, n.seen, n.user_id,  f.follower_id  AS toRef,  u.full_name FROM notifications AS n JOIN followers AS f JOIN users AS u ON (n.item_id = f.follower_id) AND (n.user_id = ?) AND (f.follower_id  = u.id);',
        [userInfo.id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
    const postsPromise = new Promise((resolve, reject) => {
      db.query(
        'SELECT DISTINCT n.id, n.action, n.created_at, n.seen, n.user_id,   p.id AS toRef,  u.full_name FROM notifications AS n JOIN posts AS p JOIN users AS u ON (n.item_id = p.id) AND (n.user_id = ?) AND (p.user_id = u.id);',
        [userInfo.id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
    const commentsPromise = new Promise((resolve, reject) => {
      db.query(
        'SELECT DISTINCT n.id, n.action, n.created_at, n.seen, n.user_id, c.id AS toRef,  u.full_name FROM notifications AS n JOIN users AS u JOIN comments AS c ON (n.item_id = c.id) AND (n.user_id = ?) AND (c.user_id = u.id);',
        [userInfo.id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    Promise.all([likePromise, followPromise, postsPromise, commentsPromise])
      .then(([likes, follows, posts, comments]) => {
        const data = [];
        data.push(...likes, ...follows, ...posts, ...comments);

        data.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB - dateA;
        });

        const dataAfterFiltered = data.filter((d) => {
          return d.full_name !== userInfo.fullName;
        });

        res.status(200).send(dataAfterFiltered);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      });
  });
};

export const addSeenTonNotifications = (req, res) => {
  const q = 'UPDATE notifications AS n SET n.seen = 1 WHERE n.id = ?';

  const seenId = req.query.seenId;

  db.query(q, [seenId], (error) => {
    if (error) {
      console.log(error);
      res.status(500).send('something went wrong');
    }

    res.status(200).send({ message: 'seen Successfully' });
  });
};
