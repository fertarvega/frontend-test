"use client";

import { ChangeEvent, useState } from "react";
import { API_URL } from "@/helpers/consts";
import { useUsers } from "@/context/UsersContext";
import { UpdateUser } from "./UpdateUser";
import { IFilters } from "@/interfaces/types";
import FiltersTableUsers from "./FiltersTableUsers";

export default function TableUsers() {
  const { users, setUsers, getUsers, paginationData, setPaginationData } =
    useUsers();
  const [filters, setFilters] = useState<IFilters>({
    email: "",
    name: "",
    company: "",
  });

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

  const handlePrev = () => {
    if (paginationData.page > 1) {
      const newPage = paginationData.page - 1;
      getUsers({
        page: newPage,
        rows: paginationData.rows,
        email: filters.email || undefined,
        name: filters.name || undefined,
      });
    }
  };

  const handleNext = () => {
    const total = paginationData?.total || 0;
    const totalPages = paginationData?.totalPages || 1;
    if (
      paginationData.page < totalPages &&
      paginationData.page * paginationData.rows < total
    ) {
      const newPage = paginationData.page + 1;
      getUsers({
        page: newPage,
        rows: paginationData.rows,
        email: filters.email || undefined,
        name: filters.name || undefined,
      });
    }
  };

  const handleRowsChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const rows = parseInt(e.target.value, 10);
    if (isNaN(rows) || rows <= 0) return;
    getUsers({
      page: 1,
      rows,
      email: filters.email || undefined,
      name: filters.name || undefined,
    });
  };

  return (
    <>
      <FiltersTableUsers filters={filters} setFilters={setFilters} />
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
      <div
        style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16 }}
      >
        <button
          type="button"
          onClick={handlePrev}
          disabled={paginationData.page === 1}
        >
          Anterior
        </button>
        <span>
          Página {paginationData.page} de {paginationData.totalPages}
        </span>
        <button
          type="button"
          onClick={handleNext}
          disabled={
            !paginationData || !paginationData.total || !paginationData.rows
              ? true
              : paginationData.page === paginationData.totalPages ||
                paginationData.page * paginationData.rows >=
                  paginationData.total
          }
        >
          Siguiente
        </button>
        <span style={{ marginLeft: 16 }}>
          Total: {paginationData?.total || users.length} usuarios
        </span>
        <select
          style={{ marginLeft: 8 }}
          onChange={handleRowsChange}
          value={paginationData.rows || 10}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>
    </>
  );
}
