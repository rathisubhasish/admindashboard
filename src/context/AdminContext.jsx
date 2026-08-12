import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import * as adminService from "../services/adminService.js";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [admins, setAdmins] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAdmins = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await adminService.getAdmins();

      setAdmins(data?.data ?? []);
    } catch (error) {
      console.error("Failed to load admins:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAdmins();
  }, [loadAdmins]);

  const addAdmin = useCallback(async (form) => {
    const admin = await adminService.createAdmin(form);
    setAdmins((prev) => [...prev, admin]);
    return admin;
  }, []);

  const value = {
    admins,
    isLoading,
    error,
    addAdmin,
    loadAdmins,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export function useAdmins() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmins must be used within AdminProvider");
  return ctx;
}
