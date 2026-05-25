const express = require("express");

const router = express.Router();

const {
  addWorker,
  getWorker,
} = require("../controllers/workerController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addWorker);

router.get("/", protect, getWorker);

module.exports = router;