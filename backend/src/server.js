const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const workerRoutes = require("./routes/workerRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB();

app.use(
  cors({
    origin: ["https://daily-wage-tracker-ima6.onrender.com/"],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/workers", workerRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
