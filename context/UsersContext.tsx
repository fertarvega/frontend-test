"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { ICompany, IPaginationUsers, IUser } from "@/interfaces/types";
import Message from "@/components/Message";
import Spinner from "@/components/Spinner";

interface UsersContextProps {
  users: IUser[];
  setUsers: Dispatch<SetStateAction<IUser[]>>;
  getUsers: (filters: {
    page: number;
    rows: number;
    email?: string;
    name?: string;
    company?: string;
  }) => Promise<void>;
  companies: ICompany[];
  paginationData: {
    total: number;
    page: number;
    rows: number;
    totalPages: number;
  };
  setPaginationData: Dispatch<
    SetStateAction<{
      total: number;
      page: number;
      rows: number;
      totalPages: number;
    }>
  >;
  flow: "default" | "loading" | "error";
}

const UsersContext = createContext<UsersContextProps | undefined>(undefined);

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [paginationData, setPaginationData] = useState<{
    total: number;
    page: number;
    rows: number;
    totalPages: number;
  }>({ total: 0, page: 1, rows: 10, totalPages: 0 });
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [flow, setFlow] = useState<"default" | "loading" | "error">("default");
  const [error, setError] = useState<string | null>(null);

  const getUsers = useCallback(
    async (filters: {
      page: number;
      rows: number;
      email?: string;
      name?: string;
      company?: string;
    }) => {
      setFlow("loading");
      try {
        let url = `/api/users`;
        if (filters) {
          const params = new URLSearchParams();
          params.append("page", filters.page.toString());
          params.append("rows", filters.rows.toString());
          if (filters.email) params.append("email", filters.email);
          if (filters.name) params.append("name", filters.name);
          if (filters.company) params.append("company", filters.company);
          url += `?${params.toString()}`;
        }
        const res = await fetch(url, { cache: "no-store" });
        const data: IPaginationUsers = await res.json();
        setUsers(data.users);
        setPaginationData({
          total: data.total,
          page: data.page,
          rows: data.rows,
          totalPages: data.totalPages,
        });
        setFlow("default");
      } catch (error) {
        setUsers([]);
        setFlow("error");

        setError(
          "Error al obtener datos, verifique su conexión e intente de nuevo."
        );
      }
    },
    [paginationData]
  );

  const getCompanies = useCallback(async () => {
    try {
      const res = await fetch(`/api/companies`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (data) setCompanies(data);
    } catch {
      setCompanies([]);
      setFlow("error");
      setError(
        "Error al obtener datos, verifique su conexión e intente de nuevo."
      );
    }
  }, []);

  const getData = async () => {
    setFlow("loading");
    setError(null);
    try {
      await Promise.all([getUsers({ page: 1, rows: 10 }), getCompanies()]);
      setFlow("default");
    } catch (error) {
      setFlow("error");
      setError(
        "Error al obtener datos, verifique su conexión e intente de nuevo."
      );
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        getUsers,
        companies,
        paginationData,
        setPaginationData,
        flow,
      }}
    >
      {flow === "error" && error && <Message type="danger">{error}</Message>}
      {/* {flow === "loading" && <Spinner />} */}
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) throw new Error("useUsers debe usarse dentro de UsersProvider");
  return context;
};
