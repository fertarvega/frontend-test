"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useUsers } from "@/context/UsersContext";
import { IFilters, IUser } from "@/interfaces/types";
import FiltersTableUsers from "./FiltersTableUsers";
import inputStyles from "@/styles/inputs.module.scss";
import styles from "@/styles/table.module.scss";
import Message from "./Message";
import Spinner from "./Spinner";
import Modal from "./Modal";
import GeneralFormUser from "./GeneralFormUser";

export default function TableUsers() {
  const { users, getUsers, paginationData, flow } = useUsers();
  const [filters, setFilters] = useState<IFilters>({
    email: "",
    name: "",
    company: "",
  });
  const [message, setMessage] = useState<{
    type: "success" | "danger" | "warning" | "primary";
    text: string;
  } | null>(null);
  const [dataToEdit, setDataToEdit] = useState<IUser>();

  const deleteUser = async (id: string) => {
    if (!window.confirm("¿Seguro que deseas borrar este usuario?")) return;
    setMessage(null);
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        getUsers({
          page: paginationData.page,
          rows: paginationData.rows,
          email: filters.email || undefined,
          name: filters.name || undefined,
          company: filters.company || undefined,
        });
        setMessage({ type: "success", text: "Usuario borrado exitosamente" });
      } else {
        setMessage({ type: "danger", text: "Error al borrar usuario" });
      }
    } catch {
      setMessage({ type: "danger", text: "Error de red al borrar usuario" });
    }
    setTimeout(() => setMessage(null), 3500);
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
  const [isOpen, setIsOpen] = useState(false);

  const handleEditUser = (user: IUser) => {
    setDataToEdit(user);
    setIsOpen(true);
  };

  return (
    <>
      {message && <Message type={message.type}>{message.text}</Message>}
      <FiltersTableUsers filters={filters} setFilters={setFilters} />
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <GeneralFormUser type="update" dataToEdit={dataToEdit} />
      </Modal>
      {flow === "loading" && <Spinner />}
      {flow !== "loading" && (
        <>
          <div className={styles["table-container"]}>
            <table className={styles.table}>
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
                      <div className={styles["table-actions"]}>
                        <button
                          onClick={() => handleEditUser(user)}
                          className={`${inputStyles.btn} ${inputStyles["btn-warning"]}`}
                        >
                          <Image
                            width={16}
                            height={16}
                            src="/edit.svg"
                            alt="Editar"
                          />
                        </button>
                        <button
                          className={`${inputStyles.btn} ${inputStyles["btn-danger"]}`}
                          onClick={() => deleteUser(user.id)}
                        >
                          <Image
                            width={16}
                            height={16}
                            src="/delete.svg"
                            alt="Borrar"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={`${styles["table-footer-container"]}`}>
            <div className={`${styles["table-footer-section"]}`}>
              <button
                type="button"
                onClick={handlePrev}
                disabled={paginationData.page === 1}
                className={`${inputStyles.btn} ${inputStyles["btn-primary"]} ${
                  paginationData.page === 1 ? inputStyles["btn-disabled"] : ""
                }`}
                tabIndex={paginationData.page === 1 ? -1 : 0}
                aria-disabled={paginationData.page === 1}
              >
                <Image
                  width={16}
                  height={16}
                  src="/left-arrow.svg"
                  alt="Borrar"
                />
              </button>
              <span>
                Página {paginationData.page} de {paginationData.totalPages}
              </span>
              <button
                type="button"
                className={`${inputStyles.btn} ${inputStyles["btn-primary"]} ${
                  !paginationData ||
                  !paginationData.total ||
                  !paginationData.rows
                    ? inputStyles["btn-disabled"]
                    : paginationData.page === paginationData.totalPages ||
                      paginationData.page * paginationData.rows >=
                        paginationData.total
                    ? inputStyles["btn-disabled"]
                    : ""
                }`}
                onClick={handleNext}
                disabled={
                  !paginationData ||
                  !paginationData.total ||
                  !paginationData.rows
                    ? true
                    : paginationData.page === paginationData.totalPages ||
                      paginationData.page * paginationData.rows >=
                        paginationData.total
                }
              >
                <Image
                  width={16}
                  height={16}
                  src="/right-arrow.svg"
                  alt="Borrar"
                />
              </button>
            </div>
            <div className={`${styles["table-footer-section"]}`}>
              <select
                style={{ marginLeft: 8 }}
                onChange={handleRowsChange}
                value={paginationData.rows || 10}
                className={inputStyles.select}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <span style={{ marginLeft: 16 }}>
                Total: {paginationData?.total || users.length} usuarios
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
