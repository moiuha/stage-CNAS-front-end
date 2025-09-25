
import { cookies } from "next/headers";

export async function getToken() {

  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}
export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = await getToken();
  const headers = {
    "Content-Type": "application/json",
    // ...(token ? { Authorization: `Bearer ${token}` } : {}),
    // ...(options.headers || {}),
  };
  const res = await fetch(`http://localhost:4040${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

