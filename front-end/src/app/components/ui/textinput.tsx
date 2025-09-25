// app/components/ui/TextInput.tsx
"use client";

import React from "react";

export default function TextInput({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      {label && <div className="text-sm font-medium text-gray-700 mb-1">{label}</div>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#004080] bg-white shadow-sm"
      />
    </label>
  );
}
