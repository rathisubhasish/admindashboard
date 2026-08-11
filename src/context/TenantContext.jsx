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

  useEffect(() => {
    tenantService.getTenants().then((data) => {
      setTenants(data);
      setLoading(false);
    });
  }, []);

  const addTenant = useCallback(async (form) => {
    const tenant = await tenantService.createTenant(form);
    setTenants((prev) => [...prev, tenant]);
    return tenant;
  }, []);

  const getTenantById = useCallback(
    (tenantId) => {
      return tenants.find((tenant) => tenant.id === tenantId) ?? null;
    },
    [tenants],
  );

  const value = { tenants, isLoading, addTenant, getTenantById };

  return (
    <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
  );
}

export function useTenants() {
  const ctx = useContext(TenantContext);
  if (!ctx) throw new Error("useTenants must be used within TenantProvider");
  return ctx;
}
