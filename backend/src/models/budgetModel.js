const db = require('../config/database');

// Use { rows } to only get the rows from db

async function getAllBudgets(user_email) {
  const query = 'SELECT * FROM budgets WHERE user_email = $1';
  values = [user_email];
  const { rows } = await db.query(query, values);
  return rows
}

async function createBudget(id, category, amount, user_email){
  const query = `
  INSERT INTO budgets (id, category, amount, user_email)
  VALUES ($1, $2, $3)
  RETURNING *
  `;
  const values = [id, category, amount, user_email];
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function updateBudget(id, category, amount, user_email){
  const query = `
  UPDATE budgets
  SET
  category = COALESCE ($1, category),
  amount = COALESCE ($2, amount)
  WHERE id = $3 AND user_email = $4
  RETURNING *`
  //^ If null don't update
  const values = [category, amount, id, user_email];
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function deleteBudget(id, user_email){
  const query = `
  DELETE FROM budgets
  WHERE id = $1 AND user_email = $2
  RETURNING *`
  const values = [id, user_email];
  const { rows } = await db.query(query, values);
  return rows[0];
}

module.exports = { 
  getAllBudgets, 
  createBudget,
  updateBudget,
  deleteBudget
};
