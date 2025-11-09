export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("token");
  const res = await fetch(`https://stririsebackend.onrender.com${url}`, {
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
