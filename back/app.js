const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'instagram_clone',
});

// Connect to the database
connection.connect((error) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Successfully connected to the database');
  }
});

const port = 8000;

app.get('/users', (req, res) => {
  connection.query('select * from users', (error, result) => {
    res.status(200).send(result);
  });
});

app.post('/users', async (req, res) => {
  const { username, fullName, profilePicture } = await req.body;
  const query =
    'INSERT INTO users (username, password, full_name, profile_picture) VALUES (?, ?, ?, ?)';

  bcrypt.hash(req.body.password, 10, (error, password) => {
    connection.query(
      query,
      [username, password, fullName, profilePicture],
      (err, result) => {
        if (err) {
          res.status(404).send({ message: 'sorry something went wrong' });
        } else {
          res.status(200).send({ message: 'added user' });
        }
      }
    );
  });
});

app.post('/login', (req, res) => {
  const { username, fullName } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND full_name = ?';
  connection.query(query, [username, fullName], (error, results) => {
    if (error) {
      console.error(error);
      res.status(404).send({ message: 'something went wrong' });
    } else if (results.length > 0) {
      // User found, generate a JWT
      const user = results[0];
      const payload = {
        userId: user.id,
      };
      const token = jwt.sign(payload, 'secret_key', { expiresIn: '1h' });
      res.send({
        message: 'Successfully logged in',
        token: token,
      });
    } else {
      // User not found
      res.status(404).send({
        message: 'Invalid username or password',
      });
    }
  });
});

app.post('/likes', (request, response) => {
  const { postId, userId } = request.body;
  // Check if the user has already liked the post
  const query = 'SELECT * FROM likes WHERE post_id = ? AND user_id = ?';
  connection.query(query, [postId, userId], (error, results) => {
    if (error) {
      console.error(error);
      response.sendStatus(500);
    } else if (results.length > 0) {
      // User has already liked the post, remove the like
      const query = 'DELETE FROM likes WHERE post_id = ? AND user_id = ?';
      connection.query(query, [postId, userId], (error) => {
        if (error) {
          console.error(error);
          response.sendStatus(500);
        } else {
          response.send({ message: 'Like removed' });
        }
      });
    } else {
      // User has not liked the post, add the like
      const query = 'INSERT INTO likes (post_id, user_id) VALUES (?, ?)';
      connection.query(query, [postId, userId], (error) => {
        if (error) {
          console.error(error);
          response.sendStatus(500);
        } else {
          response.send({ message: 'Like added' });
        }
      });
    }
  });
});

app.listen(port, () =>
  console.log(`your app is running at http://localhost:${port}`)
);
