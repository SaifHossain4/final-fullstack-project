// server/queries.js

import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

// Use Neon connection string with SSL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // allow Neon SSL cert
  },
});

// GET /api/users
export async function getUsers(req, res) {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error in getUsers:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// GET /api/users/:id
export async function getUserById(req, res) {
  try {
    const id = Number(req.params.id);
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).send("User not found");
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error in getUserById:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// POST /api/users
export async function createUser(req, res) {
  try {
    const { name, email } = req.body;

    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error in createUser:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// PUT /api/users/:id
export async function updateUser(req, res) {
  try {
    const id = Number(req.params.id);
    const { name, email } = req.body;

    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("User not found");
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error in updateUser:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// DELETE /api/users/:id
export async function deleteUser(req, res) {
  try {
    const id = Number(req.params.id);
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    console.error("Error in deleteUser:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
