import React, { ChangeEvent, FormEvent, useState } from "react";
import inputStyles from "@/styles/inputs.module.scss";
import { useUsers } from "@/context/UsersContext";
import { IUser } from "@/interfaces/types";
import formStyles from "@/styles/form.module.scss";

const initialState: Omit<IUser, "id" | "company" | "createdAt" | "updatedAt"> =
  {
    email: "",
    name: "",
    country: "",
    age: 0,
    gender: "",
    phone: "",
    companyId: "",
  };

export default function GeneralFormUser({
  type,
  dataToEdit,
}: {
  type: "create" | "update";
  dataToEdit?: IUser;
}) {
  const [form, setForm] = useState(dataToEdit ?? initialState);
  const [flow, setFlow] = useState<"default" | "loading" | "error" | "success">(
    "default"
  );
  const [error, setError] = useState<string | null>(null);
  const { getUsers, companies, paginationData } = useUsers();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "age" ? parseInt(value) : value,
    }));
  };

  const validateFrom = () => {
    if (!form.email) return "El email es obligatorio";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) return "Email inválido";
    if (!form.name || form.name.trim().length < 2)
      return "El nombre debe tener al menos 2 caracteres";
    if (!form.country || form.country.trim().length < 2)
      return "El país es obligatorio";
    if (!form.age || isNaN(form.age) || form.age < 1)
      return "Edad debe ser mayor a 0";
    if (!form.gender) return "Seleccione un género";
    if (!/^[0-9]{7,}$/.test(form.phone))
      return "Teléfono inválido (mínimo 7 dígitos numéricos)";
    if (!form.companyId) return "Seleccione una compañía";
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const validationError = validateFrom();
    if (validationError) {
      setError(validationError);
      setFlow("error");
      return;
    }
    setFlow("loading");

    const payload = {
      email: form.email,
      name: form.name,
      country: form.country,
      age: form.age,
      gender: form.gender,
      phone: form.phone,
      companyId: form.companyId,
    };

    try {
      const url =
        type === "create"
          ? `/api/users`
          : `/api/users/${dataToEdit && dataToEdit.id}`;
      const res = await fetch(url, {
        method: type === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setFlow("error");
        setError(data.error || "Error al crear usuario");
      } else {
        setFlow("success");
        if (type === "create") setForm(initialState);
        await getUsers({
          page: 1,
          rows: paginationData?.rows || 10,
        });
      }
    } catch {
      setError("Error general al crear usuario");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={formStyles.form}>
      <h3>Crear usuario</h3>
      {
        {
          error: <div>{error}</div>,
          success: (
            <div>
              {dataToEdit
                ? "Usuario editado exitosamente"
                : "Usuario creado exitosamente"}
            </div>
          ),
          loading: <div>Cargando...</div>,
          default: null,
        }[flow]
      }
      <div className={formStyles["form-input"]}>
        <label>Email:</label>
        <input
          className={inputStyles.input}
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          type="email"
        />
      </div>
      <div className={formStyles["form-input"]}>
        <label>Nombre:</label>
        <input
          className={inputStyles.input}
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className={formStyles["form-input"]}>
        <label>País:</label>
        <input
          className={inputStyles.input}
          name="country"
          value={form.country}
          onChange={handleChange}
          required
        />
      </div>
      <div className={formStyles["form-input"]}>
        <label>Edad:</label>
        <input
          className={inputStyles.input}
          name="age"
          type="number"
          value={form.age}
          onChange={handleChange}
          required
          min={0}
        />
      </div>
      <div className={formStyles["form-input"]}>
        <label>Género:</label>
        <select
          className={inputStyles.select}
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione género</option>
          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <div className={formStyles["form-input"]}>
        <label>Teléfono:</label>
        <input
          className={inputStyles.input}
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          type="tel"
          minLength={7}
        />
      </div>
      <div className={formStyles["form-input"]}>
        <label>Compañía:</label>
        <select
          className={inputStyles.select}
          name="companyId"
          value={form.companyId}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione una compañía</option>
          {companies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className={`${inputStyles.btn} ${inputStyles["btn-success"]}`}
        disabled={flow === "loading"}
        style={{ float: "inline-end", marginTop: "16px" }}
      >
        Guardar
      </button>
    </form>
  );
}
