const db = require('../config/database');

async function getUser(email) {
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];
  const { rows } = await db.query(query, values);
  return rows[0]; 
}

async function createUser(email, username, password){
  const query = `
    INSERT INTO users (email, username, password)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const values = [email, username, password];
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function updateUser(email, username){
  const query = `
    UPDATE users
    SET
      username = COALESCE($1, username) -- FIX: Removed the extra comma here
    WHERE email = $2
    RETURNING *
  `;
  const values = [username, email];
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function deleteUser(email){
  const query = `
    DELETE FROM users
    WHERE email = $1
    RETURNING *
  `;
  const values = [email];
  const { rows } = await db.query(query, values);
  return rows[0];
}

module.exports = { 
  getUser, 
  createUser,
  updateUser,
  deleteUser
};