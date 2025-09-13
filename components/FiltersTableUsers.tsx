import { useUsers } from "@/context/UsersContext";
import { IFilters } from "@/interfaces/types";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useMemo,
} from "react";

export default function FiltersTableUsers({
  filters,
  setFilters,
}: {
  filters: IFilters;
  setFilters: Dispatch<SetStateAction<IFilters>>;
}) {
  const { users, getUsers, paginationData, companies } = useUsers();

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev: IFilters) => ({ ...prev, [name]: value }));
  };

  const handleFilter = (e: FormEvent) => {
    e.preventDefault();
    getUsers({
      page: 1,
      rows: paginationData?.rows || 10,
      email: filters.email || undefined,
      name: filters.name || undefined,
      company: filters.company || undefined,
    });
  };

  return (
    <form onSubmit={handleFilter} style={{ marginBottom: 16 }}>
      <input
        type="text"
        name="name"
        placeholder="Fernando Tarango"
        value={filters.name}
        onChange={handleFilterChange}
      />
      <input
        type="text"
        name="email"
        placeholder="fertar@gmail.com"
        value={filters.email}
        onChange={handleFilterChange}
      />
      <select
        name="company"
        value={filters.company}
        onChange={handleFilterChange}
      >
        <option value="">Todas las empresas</option>
        {companies.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <button type="submit">Filtrar</button>
    </form>
  );
}
