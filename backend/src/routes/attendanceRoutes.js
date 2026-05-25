const express = require("express");

const router = express.Router();

const {
  markAttendance,
  getAttendance,
  getWorkerSummary,
} = require("../controllers/attendanceController");

router.post("/", markAttendance);

router.get("/", getAttendance);
router.get("/summary/:workerId", getWorkerSummary);

module.exports = router;