import { useUsers } from "@/context/UsersContext";
import { IFilters } from "@/interfaces/types";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import inputStyles from "@/styles/inputs.module.scss";
import filterStyles from "@/styles/filters.module.scss";

export default function FiltersTableUsers({
  filters,
  setFilters,
}: {
  filters: IFilters;
  setFilters: Dispatch<SetStateAction<IFilters>>;
}) {
  const { getUsers, paginationData, companies } = useUsers();

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
    <form onSubmit={handleFilter} className={filterStyles["filters-container"]}>
      <input
        type="text"
        name="name"
        placeholder="Fernando Tarango"
        value={filters.name}
        onChange={handleFilterChange}
        className={inputStyles.input}
      />
      <input
        type="text"
        name="email"
        placeholder="fertar@gmail.com"
        value={filters.email}
        onChange={handleFilterChange}
        className={inputStyles.input}
      />
      <select
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
      <button
        type="submit"
        className={`${inputStyles.btn} ${inputStyles["btn-primary"]}`}
      >
        Filtrar
      </button>
    </form>
  );
}
