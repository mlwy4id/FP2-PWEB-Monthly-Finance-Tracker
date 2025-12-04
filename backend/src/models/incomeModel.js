const db = require('../config/database');

// Use { rows } to only get the rows from db

async function getAllIncomes(user_email) {
  const query = 'SELECT * FROM incomes WHERE user_email = $1';
  const values = [user_email]
  const { rows } = await db.query(query, values);
  return rows
}

async function createIncome(id, title, amount, wallet, date, user_email){
  const query = `
  INSERT INTO incomes (id, title, amount, wallet, date, user_email)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *
  `;
  const values = [id, title, amount, wallet, date, user_email];
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function updateIncome(id, title, amount, wallet, date, user_email){
  const query = `
  UPDATE incomes
  SET
  title = COALESCE ($1, title),
  amount = COALESCE ($2, amount),
  wallet = COALESCE ($3, wallet),
  date = COALESCE ($4, date)
  WHERE id = $5 AND user_email = $6
  RETURNING *`
  //^ If null don't update
  const values = [title, amount, wallet, date, id, user_email];
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function deleteIncome(id, user_email){
  const query = `
  DELETE FROM incomes
  WHERE id = $1 AND user_email = $2
  RETURNING *`
  const values = [id, user_email];
  const { rows } = await db.query(query, values);
  return rows[0];
}

module.exports = { 
  getAllIncomes, 
  createIncome,
  updateIncome,
  deleteIncome
};
