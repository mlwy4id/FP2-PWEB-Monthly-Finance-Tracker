const IncomeModel = require('../models/incomeModel');

const readIncome = async (req, res) =>{
    try{
        const Income = await IncomeModel.getAllIncomes();
        return res.status(200).json(Income);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An internal error has occured'});
    }
};

const createIncome = async (req, res) => {
  const { id, title, amount, wallet, date } = req.body;

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

  try {
    const newIncome = await IncomeModel.createIncome(id, title, amount, wallet, date);
    return res.status(201).json(newIncome);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'An internal error has occured' });
  }
};

const updateIncome = async (req, res) => {
  const id = req.params.id;
  const {title, amount, wallet, date } = req.body;

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
  
  try {
    const update = await IncomeModel.updateIncome(id, title, amount, wallet, date);
    if (update == null){
      return res.status(404).json({ error: `Income with id: ${id} does not exist`})
    }
    return res.status(200).json(update);
  } catch (err){
    console.error(err);
    return res.status(500).json({ error: "An internal error has occured"});
  }
}

const deleteIncome = async (req, res) => {
  const id = req.params.id;
  if(!id){
    return res.status(400).json({ error: "'id' cannot be empty"});
  }
  try {
    const deleted = await IncomeModel.deleteIncome(id);
    if (deleted == null){
      return res.status(404).json({ error: `Income with id: ${id} does not exist`})
    }
    return res.status(200).json({ success: `Succesfully deleted income with id: ${id}`});
  } catch (err){
    console.error(err);
    return res.status(500).json({ error: "An internal error has occured"});
  }
}

module.exports = {
    readIncome,
    createIncome,
    updateIncome,
    deleteIncome
};