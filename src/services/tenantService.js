// Mock data layer shaped like a real API client (async, Promise-based).
// Swap the bodies below for real `fetch(...)` calls once the backend endpoints
// exist — callers (TenantContext) won't need to change.

const TENANTS_KEY = "admindashboard.tenants";
const MEMBERS_KEY = "admindashboard.members";

function readStore(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? [];
  } catch {
    return [];
  }
}

function writeStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export async function getTenants() {
  // TODO: replace with `return (await fetch('/api/tenants')).json()`
  return readStore(TENANTS_KEY);
}

export async function getTenantById(tenantId) {
  // TODO: replace with `return (await fetch(`/api/tenants/${tenantId}`)).json()`
  const tenants = readStore(TENANTS_KEY);
  return tenants.find((tenant) => tenant.id === tenantId) ?? null;
}

export async function createTenant(form) {
  // TODO: replace with `return (await fetch('/api/tenants', { method: 'POST', body: ... })).json()`
  const tenants = readStore(TENANTS_KEY);
  const tenant = {
    id: crypto.randomUUID(),
    name: form.name,
    legalName: form.legalName,
    logoPreview: form.logoPreview,
    mobile: form.mobile,
    email: form.email,
    address: form.address,
    city: form.city,
    state: form.state,
    pincode: form.pincode,
    country: form.country,
  };
  writeStore(TENANTS_KEY, [...tenants, tenant]);
  return tenant;
}

export async function getMembers(tenantId) {
  // TODO: replace with `return (await fetch(`/api/tenants/${tenantId}/members`)).json()`
  const members = readStore(MEMBERS_KEY);
  return members.filter((member) => member.tenant_id === tenantId);
}

export async function createMember(tenantId, form) {
  // TODO: replace with `return (await fetch(`/api/tenants/${tenantId}/members`, { method: 'POST', body: ... })).json()`
  const members = readStore(MEMBERS_KEY);
  const now = new Date().toISOString();
  const member = {
    id: crypto.randomUUID(),
    tenant_id: tenantId,
    email: form.email,
    mobile: form.mobile,
    password: form.password,
    role: form.role,
    created_at: now,
    last_login_at: null,
  };
  writeStore(MEMBERS_KEY, [...members, member]);
  return member;
}
