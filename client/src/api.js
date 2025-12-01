// src/api.js

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with status ${res.status}`);
  }

  if (res.status === 204) return null; // DELETE returns no content
  return res.json();
}

// READ: Get all users
export async function getUsers() {
  const res = await fetch(`${API_BASE_URL}/api/users`);
  return handleResponse(res);
}

// CREATE: Add a new user
export async function createUser(user) {
  const res = await fetch(`${API_BASE_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return handleResponse(res);
}

// UPDATE: Edit an existing user
export async function updateUser(id, updates) {
  const res = await fetch(`${API_BASE_URL}/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return handleResponse(res);
}

// DELETE: Remove a user
export async function deleteUser(id) {
  const res = await fetch(`${API_BASE_URL}/api/users/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}
