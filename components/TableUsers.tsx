"use client";

import { API_URL } from "@/helpers/consts";
import { useUsers } from "@/context/UsersContext";
import { UpdateUser } from "./UpdateUser";

export default function TableUsers() {
  const { users, setUsers } = useUsers();

  const deleteUser = async (id: string) => {
    if (!window.confirm("¿Seguro que deseas borrar este usuario?")) return;
    try {
      const res = await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } else {
        alert("Error al borrar usuario");
      }
    } catch {
      alert("Error de red al borrar usuario");
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo eléctronico</th>
          <th>País</th>
          <th>Compañia</th>
          <th>Edad</th>
          <th>Teléfono</th>
          <th>Género</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.country}</td>
            <td>{user.company ? user.company.name : "N/A"}</td>
            <td>{user.age}</td>
            <td>{user.phone}</td>
            <td>{user.gender}</td>
            <td>
              <UpdateUser data={user} />
              <button onClick={() => deleteUser(user.id)}>Borrar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
