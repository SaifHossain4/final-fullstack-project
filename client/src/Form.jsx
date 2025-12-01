// src/Form.jsx

import { useState } from "react";

export default function Form({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !email.trim()) return;

    onSubmit({
      name: name.trim(),
      email: email.trim(),
    });

    setName("");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          className="border rounded-md px-3 py-2 text-sm w-full"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          className="border rounded-md px-3 py-2 text-sm w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium border bg-slate-900 text-white hover:bg-slate-800"
      >
        Add User
      </button>
    </form>
  );
}
