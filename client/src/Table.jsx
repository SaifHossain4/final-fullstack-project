// src/Table.jsx

export default function Table({ users, onDelete, onEdit }) {
  if (!users || users.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        No users yet. Add a user using the form above.
      </p>
    );
  }

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b">
          <th className="py-2 text-sm font-semibold">ID</th>
          <th className="py-2 text-sm font-semibold">Name</th>
          <th className="py-2 text-sm font-semibold">Email</th>
          <th className="py-2 text-sm font-semibold">Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="border-b last:border-0">
            <td className="py-2 text-sm">{user.id}</td>
            <td className="py-2 text-sm">{user.name}</td>
            <td className="py-2 text-sm">{user.email}</td>
            <td className="py-2 text-sm space-x-2">
              <button
                onClick={() => onEdit(user)}
                className="px-2 py-1 text-xs rounded border border-slate-300 hover:bg-slate-100"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(user.id)}
                className="px-2 py-1 text-xs rounded border border-red-300 text-red-700 hover:bg-red-50"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
