// queries.js
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// GET /users
export const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error in getUsers:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// ... keep your other functions (getUserById, createUser, etc.) the same

// GET /users/:id
export const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error in getUserById:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /users
export const createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2)',
      [name, email]
    );
    res.status(201).send('User added successfully');
  } catch (err) {
    console.error('Error in createUser:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PUT /users/:id
export const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  try {
    await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id]
    );
    res.status(200).send(`User modified with ID: ${id}`);
  } catch (err) {
    console.error('Error in updateUser:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE /users/:id
export const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.status(200).send(`User deleted with ID: ${id}`);
  } catch (err) {
    console.error('Error in deleteUser:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
