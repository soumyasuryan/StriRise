export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://127.0.0.1:5000${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(options.headers || {}),
    },
  });

  // Auto logout if token is invalid
  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return res;
}
