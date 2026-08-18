import { api } from "./apiClient.js";

export async function getTenants() {
  const response = await api.get("/admin/tenant");
  return response;
}

export async function getTenantById(tenantId) {
  const response = await api.get(`/admin/tenant/${tenantId}`);
  return response;
}

export async function createTenant(form) {
  const response = await api.post("/admin/tenant", form);
  return response;
}

export async function editTenant(id, form) {
  const response = await api.put(`/admin/tenant/${id}`, form);
  return response;
}

export async function createMember(tenantId, form) {
  const response = await api.post(`/admin/tenant/${tenantId}/user`, form);

  return response;
}

export async function getMembers(tenantId) {
  const response = await api.get(`/admin/tenant/${tenantId}/user`);
  return response;
}

export async function deleteTenantUser(tenantId, id) {
  const response = await api.delete(`/admin/tenant/${tenantId}/user/${id}`);
  return response;
}

export async function deleteTenant(id) {
  const response = await api.delete(`/admin/tenant/${id}`);
  return response;
}
