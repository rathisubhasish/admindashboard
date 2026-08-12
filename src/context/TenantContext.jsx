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

      const data = await tenantService.getTenants();

      setTenants(data ?? []);
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
    const tenant = await tenantService.createTenant(form);
    setTenants((prev) => [...prev, tenant]);
    return tenant;
  }, []);

  const getTenantById = useCallback(
    (tenantId) => {
      return (
        tenants.find((tenant) => String(tenant.id) === String(tenantId)) ?? null
      );
    },
    [tenants],
  );

  const value = {
    tenants,
    isLoading,
    error,
    addTenant,
    getTenantById,
    loadTenants,
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
