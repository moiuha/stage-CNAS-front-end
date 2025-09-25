"use client";

import { logout } from "../login/actions";
import Link from "next/link";
import { FaTachometerAlt, FaBed, FaUsers, FaPlus } from "react-icons/fa";

import { act, useActionState, useState } from "react";

export default function AdminNavBar() {
  const [open, setOpen] = useState(false);

  const [state, logoutAction] = useActionState(logout, undefined);

  return (
    <header className="w-full bg-[#004080] text-white shadow-md">
      <div className="mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <span className="text-[#004080] font-bold text-lg">CNAS</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold">
              Caisse Nationale des Assurances Sociales
            </h1>
            <p className="text-sm text-gray-200">Algérie</p>
          </div>
        </div>

        {/* Admin Nav */}
        <div className="flex items-center space-x-6">
          <Link
            href="/admin/adminDashBoard"
            className="flex items-center gap-2 px-3 py-1 rounded-md border border-white/30 hover:bg-white/10 transition"
          >
            <FaTachometerAlt className="w-5 h-5" />
            <span className="text-sm">Tableau de bord</span>
          </Link>
          <Link
            href="/admin/adminRoomsManagement"
            className="flex items-center gap-2 px-3 py-1 rounded-md border border-white/30 hover:bg-white/10 transition"
          >
            <FaBed className="w-5 h-5" />
            <span className="text-sm">Toutes les chambres</span>
          </Link>
          <Link
            href="/admin/adminUserManagement"
            className="flex items-center gap-2 px-3 py-1 rounded-md border border-white/30 hover:bg-white/10 transition"
          >
            <FaUsers className="w-5 h-5" />
            <span className="text-sm">Tous les utilisateurs</span>
          </Link>
          <Link
            href="/admin/creatRoom"
            className="flex items-center gap-2 px-3 py-1 rounded-md border border-white/30 hover:bg-white/10 transition"
          >
            <FaPlus className="w-5 h-5" />
            <span className="text-sm">Créer une chambre</span>
          </Link>

          <form action={logoutAction}>
              <button
          className="ml-2 flex items-center gap-2 px-3 py-1 rounded-md border border-white/30 hover:bg-white/10 transition"
          aria-label="Se déconnecter"
              >
          <SignOutIcon className="w-5 h-5" />
          <span className="text-sm">Se déconnecter</span>
              </button>
          </form>
        </div>
      </div>
    </header>
  );
}

/* ---------- small helper components & icons (inline SVGs) ---------- */

function MobileNavItem({
  icon: Icon,
  label,
  onClick,
}: {
  icon: (props: any) => JSX.Element;
  label: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 py-2 px-2 rounded-md hover:bg-white/5 cursor-pointer"
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </div>
  );
}

/* ---------- Icons: inline SVGs so no external libs are required ---------- */

function UserIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 20a8 8 0 0116 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function RoomsIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="13" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="13" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function RoomIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="7.5" cy="9" r="0.75" fill="currentColor" />
    </svg>
  );
}

function SignOutIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M16 17l5-5-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 19v-2a4 4 0 00-4-4H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
