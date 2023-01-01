import { db } from '../connect.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = (req, res) => {
  //CHECK USER IF EXISTS

  const q = 'SELECT * FROM users WHERE username = ?';

  db.query(q, [req.body.username], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length) return res.status(409).json('User already exists!');
    //CREATE A NEW USER

    //Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      'INSERT INTO users (username, email, password, full_name, profile_picture) VALUES (?)';

    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.fullName,
      req.body.profilePicture,
    ];

    db.query(q, [values], (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json('User has been created.');
    });
  });
};

export const login = (req, res) => {
  const q = 'SELECT * FROM users WHERE username = ?';

  db.query(q, [req.body.username], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(404).json('User not found!');

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      result[0].password
    );

    if (!checkPassword)
      return res.status(400).json('Wrong password or username!');

    const token = jwt.sign(
      { id: result[0].id, fullName: result[0].full_name },
      process.env.ACCESS_TOKEN_SECRET
    );

    const { password, ...others } = result[0];

    res
      .cookie('accessToken', token, {
        httpOnly: true,
      })
      .status(200)
      .send(others);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie('accessToken', {
      secure: true,
      sameSite: 'none',
    })
    .status(200)
    .json('User has been logged out.');
};
