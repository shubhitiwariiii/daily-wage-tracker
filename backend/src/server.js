const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const workerRoutes = require("./routes/workerRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/workers", workerRoutes);
app.use("/api/attendance", attendanceRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});