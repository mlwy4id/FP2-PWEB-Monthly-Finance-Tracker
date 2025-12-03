const db = require('../config/database');

// Use { rows } to only get the rows from db

async function getAllIncomes() {
  const query = 'SELECT * FROM incomes';
  const { rows } = await db.query(query);
  return rows
}

async function createIncome(id, title, amount, wallet, date){
  const query = `
  INSERT INTO incomes (id, title, amount, wallet, date)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *
  `;
  const values = [id, title, amount, wallet, date];
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function updateIncome(id, title, amount, wallet, date){
  const query = `
  UPDATE incomes
  SET
  title = COALESCE ($1, title),
  amount = COALESCE ($2, amount),
  wallet = COALESCE ($3, wallet),
  date = COALESCE ($4, date)
  WHERE id = $5
  RETURNING *`
  //^ If null don't update
  const values = [title, amount, wallet, date, id];
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function deleteIncome (id){
  const query = `
  DELETE FROM incomes
  WHERE id = $1
  RETURNING *`
  const values = [id];
  const { rows } = await db.query(query, values);
  return rows[0];
}

module.exports = { 
  getAllIncomes, 
  createIncome,
  updateIncome,
  deleteIncome
};
