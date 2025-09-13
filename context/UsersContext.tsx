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
import { ICompany, IUser } from "@/interfaces/types";
import { API_URL } from "@/helpers/consts";

interface UsersContextProps {
  users: IUser[];
  setUsers: Dispatch<SetStateAction<IUser[]>>;
  getUsers: () => Promise<void>;
  companies: ICompany[];
}

const UsersContext = createContext<UsersContextProps | undefined>(undefined);

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [flow, setFlow] = useState<"default" | "loading" | "error">("default");
  const [error, setError] = useState<string | null>(null);

  const getUsers = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/users`, { cache: "no-store" });
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      setUsers([]);
    }
  }, []);

  const getCompanies = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/companies`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (data) setCompanies(data);
    } catch {
      setCompanies([]);
    }
  }, []);

  const getData = async () => {
    setFlow("loading");
    setError(null);
    try {
      await Promise.all([getUsers(), getCompanies()]);
      setFlow("default");
    } catch (error) {
      setFlow("error");
      setError("Error al obtener datos");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <UsersContext.Provider value={{ users, setUsers, getUsers, companies }}>
      <div>
        {
          {
            error: error,
            loading: "Cargando...",
            default: null,
          }[flow]
        }
      </div>
      {flow !== "loading" && children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) throw new Error("useUsers debe usarse dentro de UsersProvider");
  return context;
};
