// routes/userRoutes.js
const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} = require("../controllers/userController.js");
const router = express.Router();

// Register User
router.post("/users/register", registerUser);

// Login User
router.post("/users/login", loginUser);

// Get User Profile
router.get("/users/:userId", getUserProfile);

// Update User Profile
router.put("/users/:userId", updateUserProfile);

// Delete User
router.delete("/users/:userId", deleteUser);

module.exports = router;
