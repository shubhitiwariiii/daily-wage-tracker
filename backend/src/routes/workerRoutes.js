const express = require("express");

const router = express.Router();

const {
  addWorker,
  getWorker,
  deleteWorker,
  getWorkerByPhone,
  updateWorker,
} = require("../controllers/workerController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addWorker);

router.get("/", protect, getWorker);

router.delete("/:id", protect, deleteWorker);

router.get("/phone/:phone", getWorkerByPhone);

router.put("/:id", protect, updateWorker);

module.exports = router;
