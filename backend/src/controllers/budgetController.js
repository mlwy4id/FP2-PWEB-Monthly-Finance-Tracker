const BudgetModel = require('../models/budgetModel');

const readBudget = async (req, res) =>{
    try{
        const Income = await BudgetModel.getAllBudgets();
        return res.status(200).json(Income);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An internal error has occured'});
    }
};

const createBudget = async (req, res) => {
  const { id, category, amount } = req.body;

  if(!id || !category || !amount){
    return res.status(400).json({ error: "Fields cannot be empty"});
  }

  if(typeof id !== "string" || id.length > 50){
    return res.status(400).json({ error: "'id' must be a string shorter than 51"});
  }

  if(typeof category !== "string" || id.length > 50){
    return res.status(400).json({ error: "'category' must be a string shorter than 51"});
  }

  if(!Number.isInteger(amount) || amount < 0){
    return res.status(400).json({ error: "'amount' must be a positive integer preferably without any delimiters"});
  }

  try {
    const newBudget = await BudgetModel.createBudget(id, category, amount);
    return res.status(201).json(newBudget);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'An internal error has occured' });
  }
};

const updateBudget = async (req, res) => {
  const id = req.params.id;
  const {category, amount} = req.body;

  if(!id){
    return res.status(400).json({ error: "'id' cannot be empty"});
  }

  if((typeof id !== "string" || id.length > 50) && id !== null){
    return res.status(400).json({ error: "'id' must be a string shorter than 51"});
  }

  if((typeof category !== "string" || id.length > 50) && title !== null){
    return res.status(400).json({ error: "'category' must be a string shorter than 51"});
  }

  if((!Number.isInteger(amount) || amount < 0) && amount !== null){
    return res.status(400).json({ error: "'amount' must be a positive integer preferably without any delimiters"});
  }

  try {
    const update = await BudgetModel.updateBudget(id, category, amount);
    if (update == null){
      return res.status(404).json({ error: `Budget with id: ${id} does not exist`})
    }
    return res.status(200).json(update);
  } catch (err){
    console.error(err);
    return res.status(500).json({ error: "An internal error has occured"});
  }
}

const deleteBudget = async (req, res) => {
  const id = req.params.id;
  if(!id){
    return res.status(400).json({ error: "'id' cannot be empty"});
  }
  try {
    const deleted = await BudgetModel.deleteBudget(id);
    if (deleted == null){
      return res.status(404).json({ error: `Budget with id: ${id} does not exist`})
    }
    return res.status(200).json({ success: `Succesfully deleted budget with id: ${id}`});
  } catch (err){
    console.error(err);
    return res.status(500).json({ error: "An internal error has occured"});
  }
}

module.exports = {
    readBudget,
    createBudget,
    updateBudget,
    deleteBudget
};