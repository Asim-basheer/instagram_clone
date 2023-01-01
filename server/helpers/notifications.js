import { db } from '../connect.js';

export const addNotification = (userId, action, itemId) => {
  const q =
    'INSERT INTO notifications (user_id, action , item_id) VALUES (?,?,?)';

  db.query(q, [userId, action, itemId], (error) => {
    if (error) {
      console.log(error);
    }
    console.log('added the ' + action);
  });
};

export const deleteNotifications = (userId, itemId) => {
  const q = 'DELETE FROM notifications WHERE user_id = ? AND item_id = ?';

  db.query(q, [userId, itemId], (error) => {
    if (error) {
      console.log(error);
    }
    console.log('deleted');
  });
};
