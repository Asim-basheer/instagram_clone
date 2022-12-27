const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const paginate = require('jw-paginate');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

// _____________ to delete a user use this sql  __________

/*
DELETE  u, p FROM users u
LEFT JOIN posts p ON p.user_id = u.id
WHERE u.id = 30
*/

app.use(cors());
app.use(express.json());

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

app.get('/search', authenticateToken, (req, res) => {
  const username = `%${req.query.username}%`;

  const searchQuery = `
    SELECT  ${fieldsWithOutPass()} FROM users
    WHERE username LIKE ? OR full_name LIKE ?
  `;
  connection.query(searchQuery, [username, username], (error, results) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      res.send(paginateLogic(2, results));
    }
  });
});

app.post('/posts', authenticateToken, (req, res) => {
  const userId = req.body.userId;
  const caption = req.body.caption;
  const image = req.body.image;
  const insertQuery =
    'INSERT INTO posts (user_id, caption, image) VALUES (?, ?, ?)';
  connection.query(insertQuery, [userId, caption, image], (error, result) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      res.send({
        userId,
        caption,
        image,
      });
    }
  });
});

app.post('/posts/:id/comments', authenticateToken, (req, res) => {
  const postId = req.params.id;
  const userId = req.body.userId;
  const text = req.body.text;
  const insertQuery =
    'INSERT INTO comments (post_id, user_id, comment) VALUES (?, ?, ?)';
  connection.query(insertQuery, [postId, userId, text], (error, result) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      res.send({
        text,
        userId,
      });
    }
  });
});

app.delete('/posts/:id', (req, res) => {
  const postId = req.params.id;
  const deleteQuery = `
 DELETE p, c, l FROM posts p
LEFT JOIN comments c ON c.post_id = p.id
LEFT JOIN likes l ON l.post_id = p.id
WHERE p.id = ?
`;
  connection.query(deleteQuery, [postId], (error) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      res.send({ message: 'Post deleted' });
    }
  });
});

app.put('/posts/:id', authenticateToken, (req, res) => {
  const postId = req.params.id;
  const caption = req.body.caption;
  const image = req.body.image;
  const userId = req.body.userId;

  const query =
    'UPDATE posts SET caption = ?, image = ? WHERE id = ? AND user_id = ?';

  connection.query(query, [caption, image, postId, userId], (error) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    }

    res.send({ message: 'post edited' });
  });
});

app.delete('/comments/:id', authenticateToken, (request, response) => {
  const commentId = request.params.id;
  const deleteQuery = 'DELETE FROM comments WHERE id = ?';
  connection.query(deleteQuery, [commentId], (error) => {
    if (error) {
      console.error(error);
      response.sendStatus(500);
    } else {
      response.send({ message: 'Comment deleted' });
    }
  });
});

app.post('/user', async (req, res) => {
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

app.post('/likes', authenticateToken, (req, res) => {
  const { postId, userId } = req.body;
  // Check if the user has already liked the post
  const query = 'SELECT * FROM likes WHERE post_id = ? AND user_id = ?';

  connection.query(query, [postId, userId], (error, results) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else if (results.length > 0) {
      // User has already liked the post, remove the like
      const query = 'DELETE FROM likes WHERE post_id = ? AND user_id = ?';
      connection.query(query, [postId, userId], (error) => {
        if (error) {
          console.error(error);
          res.sendStatus(500);
        } else {
          res.send({ message: 'Like removed' });
        }
      });
    } else {
      // User has not liked the post, add the like
      const query = 'INSERT INTO likes (post_id, user_id) VALUES (?, ?)';
      connection.query(query, [postId, userId], (error) => {
        if (error) {
          console.error(error);
          res.sendStatus(500);
        } else {
          res.send({ message: 'Like added' });
        }
      });
    }
  });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'secret_key', (err, username) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.username = username;
    next();
  });
}

// to handle paginate logic
function paginateLogic(pageNumber, data) {
  const page = parseInt(pageNumber) || 1,
    pager = paginate(data.length, page, 1),
    pageOfItems = data.slice(pager.startIndex, pager.endIndex + 1);

  return { pager, pageOfItems };
}

function fieldsWithOutPass() {
  const fields = ['id', 'username', 'full_name', 'profile_picture'];

  return fields.join(', ');
}

app.listen(port, () =>
  console.log(`your app is running at http://localhost:${port}`)
);
