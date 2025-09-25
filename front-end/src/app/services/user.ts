import { cookies } from "next/headers";

export interface User {
  userId: any;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: string;
  checkInDate?: string;
  checkOutDate?: string;
  room?: any;
}

// Get all users (ADMIN)
export async function getAllUsers() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch("https://protective-acceptance-production.up.railway.app/users/all", {
    headers,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return await res.json();
}

// Get user by id
export async function getUserById(userId) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`https://protective-acceptance-production.up.railway.app/users/get-by-id/${userId}`, {
    headers,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return await res.json();
}
// Delete user (ADMIN)
export async function deleteUser(userId) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`https://protective-acceptance-production.up.railway.app/users/delete/${userId}`, {
    method: "DELETE",
    headers,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return await res.json();
}

// Get logged-in user profile
export async function getLoggedInUserProfile() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch("https://protective-acceptance-production.up.railway.app/users/get-logged-in-profile-info", {
    headers,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return await res.json();
}
