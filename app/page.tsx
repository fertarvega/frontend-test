"use client";
import { IUser } from "@/interfaces/types";
import styles from "@/styles/index.module.scss";
import { useEffect, useState } from "react";

export default function Page() {
  const [users, setUsers] = useState<IUser[]>([]);

  const getUsers = async () => {
    try {
      const res = await fetch("/api/users", { cache: "no-store" });
      const data = await res.json();
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <h1 className={styles.testscss}>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo eléctronico</th>
            <th>Compañia</th>
            <th>Edad</th>
            <th>Teléfono</th>
            <th>Género</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </h1>
  );
}
