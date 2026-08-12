// Central axios instance for the whole app.
// Import this (or the `api` helpers below) from every service — never call
// axios directly elsewhere, so base URL, auth, and error handling stay in one place.

import axios from "axios";

const AUTH_TOKEN_KEY = "admindashboard.auth.token";

/* ----------------------------------------------------------- token helpers --- */

export function getToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(AUTH_TOKEN_KEY, token);
  else localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function clearToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

/* ------------------------------------------------------------------- error --- */

// One consistent error shape for the UI, regardless of what axios throws
// (HTTP error, network failure, or timeout).
export class ApiError extends Error {
  constructor(message, { status = 0, data = null, code } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status; // HTTP status, or 0 for network/timeout errors
    this.data = data; // parsed response body, if any
    this.code = code; // axios code, e.g. 'ECONNABORTED' on timeout
    this.errors = data?.errors || {};
  }
}

function normalizeError(error) {
  if (error.response) {
    // Server responded with a non-2xx status.
    const { status, data } = error.response;
    const message =
      (data && typeof data === "object" && (data.message || data.error)) ||
      error.message ||
      `Request failed with status ${status}`;
    return new ApiError(message, { status, data, code: error.code });
  }
  if (error.request) {
    // Request was made but no response (network down, CORS, timeout).
    const message =
      error.code === "ECONNABORTED"
        ? "Request timed out. Please try again."
        : "Network error — could not reach the server.";
    return new ApiError(message, { status: 0, code: error.code });
  }
  // Something failed while setting up the request.
  return new ApiError(error.message || "Unexpected error", {
    code: error.code,
  });
}

/* ------------------------------------------------------------------ client --- */

const apiClient = axios.create({
  // In dev, "/api" can be proxied by Vite; in prod set an absolute URL via env.
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// Request: attach the auth token when present.
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response: unwrap `.data` on success, normalize errors, drop token on 401.
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) clearToken();
    return Promise.reject(normalizeError(error));
  },
);

/* ----------------------------------------------------------------- exports --- */

// Thin verb helpers. Each resolves to the response body directly.
export const api = {
  get: (url, config) => apiClient.get(url, config),
  post: (url, data, config) => apiClient.post(url, data, config),
  put: (url, data, config) => apiClient.put(url, data, config),
  patch: (url, data, config) => apiClient.patch(url, data, config),
  delete: (url, config) => apiClient.delete(url, config),
};

export default apiClient;
