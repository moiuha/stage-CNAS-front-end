
import React from "react";
import UsersTable from "../../components/UsersTable";
import Pagination from "../../components/Pagination";
import { getAllUsers } from "../../services/user";

type RoomRef = {
  roomId: number;
  roomType?: string | null;
};

type User = {
  userId: number;
  firstName: string;
  lastName: string;
  phoneNum?: number | null;
  email: string;
  role?: string | null;
  password?: string;
  checkInDate?: string | null; 
  checkOutDate?: string | null;
  room?: RoomRef | null;
};

export default async function AdminUserManagementPage({
  searchParams,
}: {
  searchParams?: { page?: string; size?: string };
}) {
  
  const res = await getAllUsers();
  const allUsers: User[] = res.userList || res.users || [];

  const page = Math.max(1, Number(searchParams?.page ?? 1));
  const size = Math.max(1, Number(searchParams?.size ?? 10));
  const totalItems = allUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / size));
  const start = (page - 1) * size;
  const end = start + size;
  const usersOnPage = allUsers.slice(start, end);

  return (
    <div className="p-8 max-w-6xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-200">
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-[#004080] tracking-tight">Administration — Gestion des utilisateurs</h1>
        <p className="text-base text-gray-600">
          Liste des utilisateurs enregistrés. Cliquez sur une ligne pour voir les détails.
        </p>
      </header>

      <section>
        <UsersTable users={usersOnPage} />
        <div className="mt-6 flex flex-col items-end">
          <Pagination page={page} totalItems={totalItems} pageSize={size} />
          <p className="mt-2 text-sm text-gray-500">Affichage de {usersOnPage.length} sur {totalItems} utilisateurs</p>
        </div>
      </section>
    </div>
  );
}
