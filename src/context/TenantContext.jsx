import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import * as tenantService from "../services/tenantService";

const TenantContext = createContext(null);

export function TenantProvider({ children }) {
  const [tenants, setTenants] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTenants = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await tenantService.getTenants();

      setTenants(response.data ?? []);
    } catch (error) {
      console.error("Failed to load tenants:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTenants();
  }, [loadTenants]);

  const addTenant = useCallback(async (form) => {
    try {
      const tenant = await tenantService.createTenant(form);
      if (!tenant.success) {
        return tenant;
      }

      const newTenant = tenant.data;
      setTenants((prev) => [...prev, newTenant]);
      return tenant;
    } catch (error) {
      console.error("Failed to create tenant:", error);

      return {
        success: false,
        error: error,
      };
    }
  }, []);

  const getTenantById = useCallback(
    (tenantId) => {
      return (
        tenants.find((tenant) => String(tenant.id) === String(tenantId)) ?? null
      );
    },
    [tenants],
  );

  const deleteTenant = useCallback(async (id) => {
    try {
      const result = await tenantService.deleteTenant(id);

      if (!result.success) {
        return result;
      }

      setTenants((prev) => prev.filter((tenant) => tenant.id !== id));

      return result;
    } catch (error) {
      console.error("Failed to delete tenant:", error);

      return {
        success: false,
        error,
      };
    }
  }, []);

  const value = {
    tenants,
    isLoading,
    error,
    addTenant,
    getTenantById,
    loadTenants,
    deleteTenant,
    refreshTenants: loadTenants,
  };

  return (
    <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
  );
}

export function useTenants() {
  const ctx = useContext(TenantContext);
  if (!ctx) throw new Error("useTenants must be used within TenantProvider");
  return ctx;
}
