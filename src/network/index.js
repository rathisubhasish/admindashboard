// Central network layer. Wraps the shared axios client (src/services/apiClient.js)
// with named GET/POST/PUT/PATCH/DELETE helpers so callers never import axios directly.

import { api } from "../services/apiClient";

export const get = (url, config) => api.get(url, config);
export const post = (url, data, config) => api.post(url, data, config);
export const put = (url, data, config) => api.put(url, data, config);
export const patch = (url, data, config) => api.patch(url, data, config);
export const del = (url, config) => api.delete(url, config);

export default { get, post, put, patch, del };
