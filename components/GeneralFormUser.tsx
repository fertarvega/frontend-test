import React, { ChangeEvent, FormEvent, useState } from "react";
import { useUsers } from "@/context/UsersContext";
import { IUser } from "@/interfaces/types";
import { API_URL } from "@/helpers/consts";

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
  const { getUsers, companies } = useUsers();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "age" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFlow("loading");
    setError(null);

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
          ? `${API_URL}/users`
          : `${API_URL}/users/${dataToEdit && dataToEdit.id}`;
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
        await getUsers();
      }
    } catch {
      setError("Error general al crear usuario");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <div>
        <label>Email:</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Nombre:</label>
        <input name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div>
        <label>País:</label>
        <input
          name="country"
          value={form.country}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Edad:</label>
        <input
          name="age"
          type="number"
          value={form.age}
          onChange={handleChange}
          required
          min={0}
        />
      </div>
      <div>
        <label>Género:</label>
        <select
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
      <div>
        <label>Teléfono:</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Compañía:</label>
        <select
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
      <button type="submit" disabled={flow === "loading"}>
        Guardar
      </button>
    </form>
  );
}
