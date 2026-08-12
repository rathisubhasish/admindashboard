import { api } from "./apiClient.js";

export async function getAdmins() {
  const response = await api.get("/admin");
  return response;
}

export async function createAdmin(form) {
  const response = await api.post("/admin/create", form);
  return response;
}
