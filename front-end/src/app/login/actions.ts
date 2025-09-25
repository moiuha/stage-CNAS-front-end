"use server";

import { z } from "zod";

import { redirect } from "next/navigation";
import { cookies } from "next/dist/server/request/cookies";



const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { email, password } = result.data;


  const res = await fetch('http://localhost:4040/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    return { errors: { email: ['Invalid email or password'] } };
  }

  const data = await res.json();
  console.log("User logged in:", data);
  const cookieStore = await cookies();
  cookieStore.set("token", data.token, { httpOnly: true, secure: true });
  cookieStore.set("role", data.role, { httpOnly: true, secure: true });
  if (data.role === "ADMIN") {
    redirect("/admin/adminDashBoard");
  }

  if (data.role === "USER") {  
    redirect("/");
  }

  
}
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("role");   
  
  redirect("/login");
}