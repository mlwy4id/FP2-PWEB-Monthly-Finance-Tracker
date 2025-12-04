const ExpenseModel = require('../models/expenseModel');

const readExpense = async (req, res) =>{
    try{
        const email = req.user.email;
        const Expense = await ExpenseModel.getAllExpenses(email);
        return res.status(200).json(Expense);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An internal error has occured'});
    }
};

const createExpense = async (req, res) => {
  const email = req.user.email;
  const {id, title, amount, wallet, date, category} = req.body;

  if(!id || !title || !amount ||!wallet ||!date){
    return res.status(400).json({ error: "Fields cannot be empty"});
  }

  if(typeof id !== "string" || id.length > 50){
    return res.status(400).json({ error: "'id' must be a string shorter than 51"});
  }

  if(typeof title !== "string" || id.length > 255){
    return res.status(400).json({ error: "'title' must be a string shorter than 256"});
  }

  if(!Number.isInteger(amount) || amount < 0){
    return res.status(400).json({ error: "'amount' must be a positive integer preferably without any delimiters"});
  }

  if(typeof wallet !== "string" || id.length > 50){
    return res.status(400).json({ error: "'wallet' must be a string shorter than 51"});
  }

  if(typeof date !== "string" || id.length > 255){
    return res.status(400).json({ error: "'date' must be a string shorter than 256"});
  }

  if(typeof category !== "string" || id.length > 50){
    return res.status(400).json({ error: "'category' must be a string shorter than 51"});
  }

  try {
    const newExpense = await ExpenseModel.createExpense(id, title, amount, wallet, date, category, email);
    return res.status(201).json(newExpense);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'An internal error has occured' });
  }
};

const updateExpense = async (req, res) => {
  const email = req.user.email;
  const {id, title, amount, wallet, date } = req.body;

  if(!id){
    return res.status(400).json({ error: "'id' cannot be empty"});
  }

  if((typeof id !== "string" || id.length > 50) && id !== null){
    return res.status(400).json({ error: "'id' must be a string shorter than 51"});
  }

  if((typeof title !== "string" || id.length > 255) && title !== null){
    return res.status(400).json({ error: "'title' must be a string shorter than 256"});
  }

  if((!Number.isInteger(amount) || amount < 0) && amount !== null){
    return res.status(400).json({ error: "'amount' must be a positive integer preferably without any delimiters"});
  }

  if((typeof wallet !== "string" || id.length > 50) && wallet !== null){
    return res.status(400).json({ error: "'wallet' must be a string shorter than 51"});
  }

  if((typeof date !== "string" || id.length > 255 && date !== null)){
    return res.status(400).json({ error: "'date' must be a string shorter than 256"});
  }

  if((typeof category !== "string" || id.length > 50) && wallet !== null){
    return res.status(400).json({ error: "'category' must be a string shorter than 51"});
  }

  try {
    const update = await ExpenseModel.updateExpense(id, title, amount, wallet, date, category, email);
    if (update == null){
      return res.status(404).json({ error: `Expense with id: ${id} does not exist`})
    }
    return res.status(200).json(update);
  } catch (err){
    console.error(err);
    return res.status(500).json({ error: "An internal error has occured"});
  }
}

const deleteExpense = async (req, res) => {
  const email = req.user.email;
  const id = req.body.id;
  if(!id){
    return res.status(400).json({ error: "'id' cannot be empty"});
  }
  try {
    const deleted = await ExpenseModel.deleteExpense(id, email);
    if (deleted == null){
      return res.status(404).json({ error: `Income with id: ${id} does not exist`})
    }
    return res.status(200).json({ success: `Succesfully deleted expense with id: ${id}`});
  } catch (err){
    console.error(err);
    return res.status(500).json({ error: "An internal error has occured"});
  }
}

module.exports = {
    readExpense,
    createExpense,
    updateExpense,
    deleteExpense
};