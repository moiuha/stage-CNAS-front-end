// app/components/ui/Button.tsx
"use client";

import React from "react";

export default function Button({
  children,
  type = "button",
  onClick,
  disabled,
  variant = "primary",
}: {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  variant?: "primary" | "ghost";
}) {
  const base = "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-1";
  const primary =
    "bg-[#004080] text-white hover:bg-[#003366] border border-[#004080] shadow-sm";
  const ghost = "bg-white text-[#004080] border border-gray-200 hover:bg-gray-50";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variant === "primary" ? primary : ghost} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}
