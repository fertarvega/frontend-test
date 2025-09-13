"use client";

import { useEffect, useState } from "react";
import GeneralFormUser from "@/components/GeneralFormUser";
import { API_URL } from "@/helpers/consts";
import { IUser } from "@/interfaces/types";
import styles from "@/styles/index.module.scss";

export default function Page() {
  const [users, setUsers] = useState<IUser[]>([]);

  const getUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/users`, { cache: "no-store" });
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

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

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section>
      <GeneralFormUser type="create" />
      <h1 className={styles.testscss}>Listado de usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo eléctronico</th>
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
              <td>{user.company ? user.company.name : "N/A"}</td>
              <td>{user.age}</td>
              <td>{user.phone}</td>
              <td>{user.gender}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
