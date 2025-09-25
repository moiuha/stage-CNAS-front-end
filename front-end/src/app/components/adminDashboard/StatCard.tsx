"use client";
import React from "react";

export default function StatCard({ title, value, subtitle, smallText = false }: { title: string; value: number | string; subtitle?: string; smallText?: boolean; }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="text-sm font-medium text-gray-600">{title}</div>
      <div className="mt-2 text-2xl font-bold text-[#004080]">{value}</div>
      {subtitle && <div className={`mt-1 text-sm text-gray-500 ${smallText ? "truncate" : ""}`}>{subtitle}</div>}
    </div>
  );
}
