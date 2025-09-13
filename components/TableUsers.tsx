"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { API_URL } from "@/helpers/consts";
import { useUsers } from "@/context/UsersContext";
import { UpdateUser } from "./UpdateUser";

export default function TableUsers() {
  const { users, setUsers, getUsers } = useUsers();
  const [filters, setFilters] = useState({ email: "", name: "", country: "" });

  const countries = useMemo(() => {
    const set = new Set<string>();
    users.forEach((item) => {
      if (item.country) set.add(item.country);
    });
    return Array.from(set).sort();
  }, [users]);

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = (e: FormEvent) => {
    e.preventDefault();
    getUsers({
      email: filters.email || undefined,
      name: filters.name || undefined,
    });
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

  return (
    <>
      <form onSubmit={handleFilter} style={{ marginBottom: 16 }}>
        <input
          type="text"
          name="email"
          placeholder="Filtrar por email"
          value={filters.email}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Filtrar por nombre"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <select
          name="country"
          value={filters.country}
          onChange={handleFilterChange}
        >
          <option value="">Todos los países</option>
          {countries.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button type="submit">Filtrar</button>
      </form>
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
          {users
            .filter(
              (user) => !filters.country || user.country === filters.country
            )
            .map((user) => (
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
    </>
  );
}
