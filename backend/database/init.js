// Import the database connection you already created
const db = require('../src/config/database');

const tableList = ["incomes", "expenses", "budgets", "users"]; 

const refresh = async (tableList) => {
  for (const table of tableList){
    await db.query(`DROP TABLE IF EXISTS ${table} CASCADE`);
  }
}

const createUsers = `
  CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
  );
`

const createIncomes = `
  CREATE TABLE IF NOT EXISTS incomes (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    amount INTEGER NOT NULL,
    wallet VARCHAR(50),
    date VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE
  );
`;

const createExpenses = `
  CREATE TABLE IF NOT EXISTS expenses (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    amount INTEGER NOT NULL,
    wallet VARCHAR(50),
    date VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE
  );
`;

const createBudgets = `
  CREATE TABLE IF NOT EXISTS budgets (
    id VARCHAR (50) PRIMARY KEY,
    category VARCHAR(50),
    amount INTEGER NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE
  );
`

const initDb = async () => {
  try {
    // Running queries
    await refresh(tableList);

    await db.query(createUsers);
    console.log('Table "users" created succesfully!')
    await db.query(createIncomes);
    console.log('Table "incomes" created successfully!');
    await db.query(createExpenses);
    console.log('Table "expenses" created succesfully!');
    await db.query(createBudgets);
    console.log('Table "budgets" created succesfully!');

  } catch (error) {
    console.error('Database initialization failed:', error);
  } finally {
    // We cannot close the pool easily because we exported a wrapper function,
    // so we just exit the process to stop the script from hanging.
    process.exit();
  }
};

initDb();