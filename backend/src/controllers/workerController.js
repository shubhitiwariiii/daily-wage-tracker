const Worker = require("../models/Worker");

const addWorker = async (req, res) => {
  try {
    const { name, phone, dailyWage } = req.body;

    const worker = await Worker.create({
      name,
      phone,
      dailyWage,
    });

    res.status(201).json(worker);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getWorker = async (req, res) => {
  try {
    const workers = await Worker.find();

    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addWorker,
  getWorker,
};