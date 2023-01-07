import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { db } from './connect.js';

import authRouter from './routes/auth.js';
import postsRouter from './routes/post.js';
import commentsRouter from './routes/comment.js';
import likesRouter from './routes/like.js';
import usersRouter from './routes/user.js';
import followRouter from './routes/follow.js';
import notificationRouter from './routes/notification.js';

import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

// _____________ to delete a user use this sql  __________

/*
DELETE  u, p FROM users u
LEFT JOIN posts p ON p.user_id = u.id
WHERE u.id = 30
*/

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
//middlewares
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(cookieParser());

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());

// Connect to the database
db.connect((error) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Successfully connected to the database');
  }
});

app.use('/', authRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/likes', likesRouter);
app.use('/user', usersRouter);
app.use('/follow', followRouter);
app.use('/notifications', notificationRouter);

// app.get('/posts/:id/:postId', (req, res) => {
//   const id = req.params.id;
//   const postId = req.params.postId;

//   const usersPromise = new Promise((resolve, reject) => {
//     db.query(
//       'SELECT * FROM users WHERE users.id = ?',
//       [id],
//       (error, results) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(results);
//         }
//       }
//     );
//   });

//   const postsPromise = new Promise((resolve, reject) => {
//     db.query(
//       'SELECT * FROM posts WHERE posts.user_id = ?',
//       [id],
//       (error, results) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(results);
//         }
//       }
//     );
//   });

//   const commentPromise = new Promise((resolve, reject) => {
//     db.query(
//       'SELECT * FROM comments WHERE comments.post_id = ?',
//       [postId],
//       (error, results) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(results);
//         }
//       }
//     );
//   });

//   const likesPromise = new Promise((resolve, reject) => {
//     db.query(
//       'SELECT * FROM  likes WHERE likes.post_id = ?',
//       [postId],
//       (error, results) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(results);
//         }
//       }
//     );
//   });

//   Promise.all([usersPromise, postsPromise, likesPromise, commentPromise])
//     .then(([user, posts, likes, comments]) => {
//       res.send({ user, posts, likes, comments });
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//     });
// });

app.listen(process.env.PORT, () =>
  console.log(`your app is running at http://localhost:${process.env.PORT}`)
);
