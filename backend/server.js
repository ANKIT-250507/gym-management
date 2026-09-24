const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/database");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/member", require("./routes/memberRoutes"));
app.use("/api/health", require("./routes/healthRoutes"));
app.use("/api/workout", require("./routes/workoutRoutes"));
app.use("/api/trainer", require("./routes/trainerRoutes"));
app.use("/api/membership", require("./routes/membershipRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/diet", require("./routes/dietRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use(
    "/api/notifications",
    require("./routes/notificationRoutes")
);
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.get("/", (req, res) => {
    res.send("Gym Management API Running...");
});
 const errorHandler = require("./middleware/errorMiddleware");

app.use(errorHandler);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});