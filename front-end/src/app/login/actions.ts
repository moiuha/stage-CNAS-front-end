"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { cookies } from "next/dist/server/request/cookies";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().trim(),
});


type LoginErrors = {
  errors: Record<string, string[]>;
};


export async function login(
  _prevState: unknown,
  formData: FormData
): Promise<LoginErrors | void> {
  const result = loginSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { email, password } = result.data;

  const res = await fetch(
    "https://protective-acceptance-production.up.railway.app/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!res.ok) {
    return { errors: { email: ["Invalid email or password"] } };
  }

  const data: { token: string; role: "ADMIN" | "USER" } = await res.json();
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

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("role");

  redirect("/login");
}
