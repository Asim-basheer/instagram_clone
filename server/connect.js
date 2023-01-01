import mysql from 'mysql';
// Create a connection to the database
export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'instagram_clone',
});
