const db = require('../config/database');

// Use { rows } to only get the rows from db

async function getAllBudgets() {
  const query = 'SELECT * FROM budgets';
  const { rows } = await db.query(query);
  return rows
}

async function createBudget(id, category, amount){
  const query = `
  INSERT INTO budgets (id, category, amount)
  VALUES ($1, $2, $3)
  RETURNING *
  `;
  const values = [id, category, amount];
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function updateBudget(id, category, amount){
  const query = `
  UPDATE budgets
  SET
  category = COALESCE ($1, category),
  amount = COALESCE ($2, amount)
  WHERE id = $3
  RETURNING *`
  //^ If null don't update
  const values = [category, amount, id];
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function deleteBudget(id){
  const query = `
  DELETE FROM budgets
  WHERE id = $1
  RETURNING *`
  const values = [id];
  const { rows } = await db.query(query, values);
  return rows[0];
}

module.exports = { 
  getAllBudgets, 
  createBudget,
  updateBudget,
  deleteBudget
};
