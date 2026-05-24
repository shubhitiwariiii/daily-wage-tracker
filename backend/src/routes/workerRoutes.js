const express = require("express");

const router = express.Router();

const {
  addWorker,
  getWorker,
} = require("../controllers/workerController");

router.post("/", addWorker);

router.get("/", getWorker);

module.exports = router;