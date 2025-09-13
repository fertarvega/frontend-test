import Image from "next/image";
import { useUsers } from "@/context/UsersContext";
import { IFilters } from "@/interfaces/types";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import inputStyles from "@/styles/inputs.module.scss";
import filterStyles from "@/styles/filters.module.scss";
import Message from "./Message";

interface FiltersTableUsersProps {
  filters: IFilters;
  setFilters: Dispatch<SetStateAction<IFilters>>;
}

export default function FiltersTableUsers({
  filters,
  setFilters,
}: FiltersTableUsersProps) {
  const { getUsers, paginationData, companies } = useUsers();
  const [message, setMessage] = useState<null | {
    type: "danger" | "success" | "warning" | "primary";
    text: string;
  }>(null);

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev: IFilters) => ({ ...prev, [name]: value }));
  };

  const handleFilter = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      await getUsers({
        page: 1,
        rows: paginationData?.rows || 10,
        email: filters.email || undefined,
        name: filters.name || undefined,
        company: filters.company || undefined,
      });
    } catch {
      setMessage({ type: "danger", text: "Error al filtrar usuarios" });
      setTimeout(() => setMessage(null), 3500);
    }
  };

  return (
    <>
      {message && <Message type={message.type}>{message.text}</Message>}
      <form
        onSubmit={handleFilter}
        className={filterStyles["filters-container"]}
      >
        <div className={filterStyles["filters-inputs"]}>
          <label htmlFor="filter-name">Nombre:</label>
          <input
            id="filter-name"
            type="text"
            name="name"
            placeholder="Fernando Tarango"
            value={filters.name}
            onChange={handleFilterChange}
            className={inputStyles.input}
          />
        </div>
        <div className={filterStyles["filters-inputs"]}>
          <label htmlFor="filter-email">Email:</label>
          <input
            id="filter-email"
            type="text"
            name="email"
            placeholder="fertar@gmail.com"
            value={filters.email}
            onChange={handleFilterChange}
            className={inputStyles.input}
          />
        </div>
        <div className={filterStyles["filters-inputs"]}>
          <label htmlFor="filter-company">Empresa:</label>
          <select
            id="filter-company"
            name="company"
            value={filters.company}
            onChange={handleFilterChange}
            className={inputStyles.select}
          >
            <option value="">Todas las empresas</option>
            {companies.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className={`${inputStyles.btn} ${inputStyles["btn-primary"]}`}
        >
          <Image width={20} height={20} src="/filter.svg" alt="Filtrar" />
        </button>
      </form>
    </>
  );
}
