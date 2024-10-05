require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const questionRoutes = require("./routes/questionRoutes");
const quizRoutes = require("./routes/quizRoutes.js");
const answerRoutes = require("./routes/answerRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection setup with async/await and improved error handling
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1); // Exit process with failure
  }
};
connectDB();

// Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", quizRoutes);
app.use("/api/v1", questionRoutes);
app.use("/api/v1", answerRoutes);

const PORT = process.env.PORT || 5004;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("Process terminated");
    mongoose.connection.close(false, () => {
      console.log("MongoDB connection closed");
      process.exit(0);
    });
  });
});
