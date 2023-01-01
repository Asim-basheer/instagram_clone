import { db } from '../connect.js';
import jwt from 'jsonwebtoken';
import { paginateLogic } from '../helpers/paginate.js';

export const searchUsers = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not logged in!');

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
    if (err) return res.status(403).json('Token is not valid!');
    const username = `%${req.query.username}%`;
    const pageNumber = req.query.pageNumber;
    const fields = ['id', 'username', 'full_name', 'profile_picture'];
    const searchQuery = `
      SELECT  ${fields.join(', ')} FROM users
      WHERE username LIKE ? OR full_name LIKE ?
    `;
    db.query(searchQuery, [username, username], (error, results) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
      } else {
        res.send(paginateLogic(pageNumber, results));
      }
    });
  });
};

export const getUser = (req, res) => {
  const userId = req.query.userId;
  const q = 'SELECT * FROM users WHERE id = ?';
  db.query(q, [userId], (error, userData) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    }

    const { password, email, ...others } = userData[0];
    res.status(200).send(others);
  });
};
