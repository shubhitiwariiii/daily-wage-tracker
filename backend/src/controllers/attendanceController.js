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

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);

    tomorrow.setDate(tomorrow.getDate() + 1);

    // Check if attendance already exists today
    const existingAttendance = await Attendance.findOne({
      workerId,

      date: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    if (existingAttendance) {
      return res.status(400).json({
        message: "Attendance already marked today",
      });
    }

    const attendance = await Attendance.create({
      workerId,
      status,
      wageForDay: status === "Present" ? worker.dailyWage : 0,
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate("workerId");

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getWorkerSummary = async (req, res) => {
  try {
    const { workerId } = req.params;

    const attendance = await Attendance.find({
      workerId,
    });

    const totalPresent = attendance.filter(
      (item) => item.status === "Present",
    ).length;

    const totalAbsent = attendance.filter(
      (item) => item.status === "Absent",
    ).length;

    const totalWages = attendance.reduce(
      (sum, item) => sum + item.wageForDay,
      0,
    );

    res.status(200).json({
      totalPresent,
      totalAbsent,
      totalWages,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  markAttendance,
  getAttendance,
  getWorkerSummary,
};
