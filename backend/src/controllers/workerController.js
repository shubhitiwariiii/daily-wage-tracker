const Attendance = require("../models/Attendance");
const Worker = require("../models/Worker");

const addWorker = async (req, res) => {
  try {
    const { name, phone, dailyWage } = req.body;

    const worker = await Worker.create({
      name,
      phone,
      dailyWage,
      contractorId: req.user._id,
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
    const workers = await Worker.find({
      contractorId: req.user._id,
    });

    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteWorker = async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);

    if (!worker) {
      return res.status(404).json({
        message: "Worker not found",
      });
    }

    await Attendance.deleteMany({
      workerId: worker._id,
    });

    await worker.deleteOne();

    res.status(200).json({
      message: "Worker deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getWorkerByPhone = async (
  req,
  res
) => {
  try {
    const worker =
      await Worker.findOne({
        phone: req.params.phone,
      });

    if (!worker) {
      return res.status(404).json({
        message: "Worker not found",
      });
    }

    res.status(200).json(worker);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addWorker,
  getWorker,
  deleteWorker,
  getWorkerByPhone,
};
