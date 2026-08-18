import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TenantProvider } from "./context/TenantContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Tenants from "./pages/Tenant/Tenants";
import TenantDetail from "./pages/Tenant/TenantDetails/TenantDetail";
import Settings from "./pages/Settings/Settings";
import { AdminProvider } from "./context/AdminContext.jsx";
import Admins from "./pages/Admins/Admins.jsx";
import TenantMembers from "./pages/Tenant/TenantDetails/TenantMembers.jsx";
import TenantSettings from "./pages/Tenant/TenantDetails/TenantSettings.jsx";
import TenantData from "./pages/Tenant/TenantDetails/TenantData.jsx";

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <TenantProvider>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="tenants" element={<Tenants />} />
                <Route path="tenants/:tenantId" element={<TenantDetail />}>
                  <Route index element={<TenantData />} />
                  <Route path="members" element={<TenantMembers />} />
                  <Route path="settings" element={<TenantSettings />} />
                </Route>
                <Route path="admins" element={<Admins />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </TenantProvider>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;
