const db = require('../config/database');

// Use { rows } to only get the rows from db

async function getAllExpenses() {
  const query = 'SELECT * FROM expenses';
  const { rows } = await db.query(query);
  return rows
}

async function createExpense(id, title, amount, wallet, date, category){
  const query = `
  INSERT INTO expenses (id, title, amount, wallet, date, category)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *
  `;
  const values = [id, title, amount, wallet, date, category];
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function updateExpense(id, title, amount, wallet, date){
  const query = `
  UPDATE expenses
  SET
  title = COALESCE ($1, title),
  amount = COALESCE ($2, amount),
  wallet = COALESCE ($3, wallet),
  date = COALESCE ($4, date)
  category = COALESCE ($5, category)
  WHERE id = $6
  RETURNING *`
  //^ If null don't update
  const values = [title, amount, wallet, date, category, id];
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function deleteExpense(id){
  const query = `
  DELETE FROM expenses
  WHERE id = $1
  RETURNING *`
  const values = [id];
  const { rows } = await db.query(query, values);
  return rows[0];
}

module.exports = { 
  getAllExpenses, 
  createExpense,
  updateExpense,
  deleteExpense
};
