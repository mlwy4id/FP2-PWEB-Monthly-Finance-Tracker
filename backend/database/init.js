// Import the database connection you already created
const db = require('../src/config/database');

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS incomes (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    amount INTEGER NOT NULL,
    wallet VARCHAR(50),
    date VARCHAR(255) NOT NULL
  );
`;

const initDb = async () => {
  try {
    // Run the query
    await db.query(createTableQuery);
    console.log('✅ Table "incomes" created successfully!');
  } catch (error) {
    console.error('❌ Error creating table:', error);
  } finally {
    // We cannot close the pool easily because we exported a wrapper function,
    // so we just exit the process to stop the script from hanging.
    process.exit();
  }
};

initDb();