const express = require('express');
const cors = require('cors');
const app = express();

const incomeRoutes = require('./routes/incomeRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/income', incomeRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route tidak ditemukan' });
});

module.exports = app;
