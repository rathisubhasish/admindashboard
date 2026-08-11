import { useCallback, useEffect, useState } from "react";
import { get, post, put, patch, del } from "../network";

const METHODS = { get, post, put, patch, delete: del };

// Generic data-fetching hook on top of src/network.
// useNetwork('/tenants') -> GETs immediately.
// useNetwork('/tenants', { method: 'post', body, immediate: false }) -> call `reload()` to fire it.
export default function useNetwork(
  path,
  { method = "get", body, immediate = true } = {},
) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(immediate);

  const request = METHODS[method];

  const call = useCallback(
    async (overridePath = path, overrideBody = body) => {
      setLoading(true);
      setError(null);
      try {
        const response =
          method === "get" || method === "delete"
            ? await request(overridePath)
            : await request(overridePath, overrideBody);
        setData(response);
        return response;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [path, body, method, request],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- idiomatic loading-flag reset before an async fetch
    if (immediate && path) call();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return { data, error, loading, reload: call };
}
