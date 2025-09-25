// components/admin/Pagination.tsx
"use client";
import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function Pagination({ page, totalItems, pageSize }: { page: number; totalItems: number; pageSize: number; }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const goTo = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    params.set("size", String(pageSize));
    router.push(`${pathname}?${params.toString()}`);
  };

  const numbers: number[] = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + 4);
  for (let i = start; i <= end; i++) numbers.push(i);

  return (
    <div className="flex items-center justify-between mt-6">
      <div className="flex items-center gap-2">
        <button onClick={() => goTo(Math.max(1, page - 1))} disabled={page === 1} className="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50">
          Précédent
        </button>
        {numbers.map((n) => (
          <button key={n} onClick={() => goTo(n)} className={`px-3 py-1 rounded-lg border border-gray-300 font-semibold ${n === page ? "bg-[#004080] text-white" : "bg-white text-gray-800 hover:bg-gray-50"} transition`}>
            {n}
          </button>
        ))}
        <button onClick={() => goTo(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50">
          Suivant
        </button>
      </div>
      <div className="text-sm text-gray-700 font-medium">Page {page} sur {totalPages}</div>
    </div>
  );
}
