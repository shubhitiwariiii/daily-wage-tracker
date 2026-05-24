const Attendance = require("../models/Attendance");
const Worker = require("../models/Worker");

const markAttendance = async (req, res) => {
  try {
    const { workerId, status } = req.body;

    const worker = await Worker.findById(workerId);

    if (!worker) {
      return res.status(404).json({
        message: "Worker not found",
      });
    }

    const attendance = await Attendance.create({
      workerId,
      status,
      wageForDay:
        status === "Present" ? worker.dailyWage : 0,
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  markAttendance,
};