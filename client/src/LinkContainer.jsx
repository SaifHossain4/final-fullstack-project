// src/LinkContainer.jsx

import { useEffect, useState } from "react";
import Table from "./Table";
import Form from "./Form";
import { getUsers, createUser, updateUser, deleteUser } from "./api";

export default function LinkContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ----- READ: load all users when the component mounts -----
  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      setLoading(true);
      setError("");
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load users from the server.");
    } finally {
      setLoading(false);
    }
  }

  // ----- CREATE -----
  async function handleAddUser(newUser) {
    if (!newUser.name.trim() || !newUser.email.trim()) return;

    try {
      setError("");
      const created = await createUser(newUser);
      setUsers((prev) => [...prev, created]);
    } catch (err) {
      console.error(err);
      setError("Failed to create user.");
    }
  }

  // ----- DELETE -----
  async function handleDeleteUser(id) {
    try {
      setError("");
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete user.");
    }
  }

  // ----- UPDATE -----
  async function handleEditUser(user) {
    const newName = window.prompt("New name:", user.name);
    if (newName === null) return;

    const newEmail = window.prompt("New email:", user.email);
    if (newEmail === null) return;

    const updates = { name: newName.trim(), email: newEmail.trim() };
    if (!updates.name || !updates.email) return;

    try {
      setError("");
      const updated = await updateUser(user.id, updates);
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? updated : u))
      );
    } catch (err) {
      console.error(err);
      setError("Failed to update user.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-xl p-6 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold">User Manager</h1>
          <p className="text-sm text-slate-500">
            React + Express + Postgres CRUD demo.
          </p>
        </header>

        {error && (
          <div className="rounded-md bg-red-100 text-red-700 px-3 py-2 text-sm">
            {error}
          </div>
        )}

        <Form onSubmit={handleAddUser} />

        {loading ? (
          <p className="text-sm text-slate-500">Loading users...</p>
        ) : (
          <Table
            users={users}
            onDelete={handleDeleteUser}
            onEdit={handleEditUser}
          />
        )}
      </div>
    </div>
  );
}
