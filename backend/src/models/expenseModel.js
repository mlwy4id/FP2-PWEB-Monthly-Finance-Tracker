const db = require('../config/database');

// Use { rows } to only get the rows from db

async function getAllExpenses(user_email) {
  const query = 'SELECT * FROM expenses WHERE user_emails = $1';
  values = [user_email];
  const { rows } = await db.query(query, values);
  return rows
}

async function createExpense(id, title, amount, wallet, date, category, user_email){
  const query = `
  INSERT INTO expenses (id, title, amount, wallet, date, category, user_email)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *
  `;
  const values = [id, title, amount, wallet, date, category, user_email];
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function updateExpense(id, title, amount, wallet, date, user_email){
  const query = `
  UPDATE expenses
  SET
  title = COALESCE ($1, title),
  amount = COALESCE ($2, amount),
  wallet = COALESCE ($3, wallet),
  date = COALESCE ($4, date),
  category = COALESCE ($5, category)
  WHERE id = $6 AND user_email = $7
  RETURNING *`
  //^ If null don't update
  const values = [title, amount, wallet, date, category, id, user_email];
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function deleteExpense(id, user_email){
  const query = `
  DELETE FROM expenses
  WHERE id = $1 AND user_email = $2
  RETURNING *`
  const values = [id, user_email];
  const { rows } = await db.query(query, values);
  return rows[0];
}

module.exports = { 
  getAllExpenses, 
  createExpense,
  updateExpense,
  deleteExpense
};
