const express = require('express');
const cors = require('cors');
const app = express();

const incomeRoutes = require('./routes/incomeRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/income', incomeRoutes);
app.use('/api/expense', expenseRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

module.exports = app;
