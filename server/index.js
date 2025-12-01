// index.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "./queries.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());          // Allow frontend to talk to backend
app.use(express.json());  // Parse JSON body

// Simple test route
app.get("/", (req, res) => {
  res.send("API is live");
});

// CRUD routes for users
// (I’d suggest prefixing with /api so frontend is clearer)
app.get("/api/users", getUsers);
app.get("/api/users/:id", getUserById);
app.post("/api/users", createUser);
app.put("/api/users/:id", updateUser);
app.delete("/api/users/:id", deleteUser);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
