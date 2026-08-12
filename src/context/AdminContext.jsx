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
    try {
      const result = await adminService.createAdmin(form);

      if (!result.success) {
        return result;
      }

      const newAdmin = result.data;

      setAdmins((prev) => [...prev, newAdmin]);

      return result;
    } catch (error) {
      console.error("Failed to create admin:", error);

      return {
        success: false,
        error: error,
      };
    }
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
