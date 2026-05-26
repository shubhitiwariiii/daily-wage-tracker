const express = require("express");

const router = express.Router();

const {
  addWorker,
  getWorker,
  deleteWorker,
} = require("../controllers/workerController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addWorker);

router.get("/", protect, getWorker);

router.delete("/:id", protect, deleteWorker);

module.exports = router;