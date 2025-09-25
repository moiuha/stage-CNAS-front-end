
"use client";

export default function Alert({ type = "info", message }: { type?: "info" | "success" | "error"; message: string }) {
  const colors = {
    info: "bg-blue-50 text-blue-800 border-blue-100",
    success: "bg-emerald-50 text-emerald-800 border-emerald-100",
    error: "bg-rose-50 text-rose-800 border-rose-100",
  } as const;

  return (
    <div className={`p-3 rounded-md border ${colors[type]} text-sm`}>
      {message}
    </div>
  );
}
