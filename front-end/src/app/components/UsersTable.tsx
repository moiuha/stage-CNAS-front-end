
"use client";
import React from "react";
import { useRouter } from "next/navigation";

type User = {
  userId: any;
  firstName: string;
  lastName: string;
  phoneNum?: number | null;
  email: string;
  room?: { roomId: number } | null;
};

export default function UsersTable({ users }: { users: User[] }) {
  const router = useRouter();

  const onRowClick = (id : any) => {

    router.push(`/admin/adminUserInfo/${id}`);
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Prénom</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Nom</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Email</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Téléphone</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Statut</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-100">
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-6 text-center text-sm text-gray-500">Aucun utilisateur à afficher</td>
            </tr>
          ) : (
            users.map((u) => (
              <tr
                key={u.userId}
                className="hover:bg-blue-50 cursor-pointer transition-colors duration-150"
                onClick={() => onRowClick(u.userId)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') onRowClick(u.userId); }}
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{u.firstName}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{u.lastName}</td>
                <td className="px-4 py-3 text-sm text-gray-800">{u.email}</td>
                <td className="px-4 py-3 text-sm text-gray-800">{u.phoneNum ?? "—"}</td>
                <td className="px-4 py-3 text-sm">
                  {u.room ? (
                    <span className="inline-block px-3 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-semibold">Réservée</span>
                  ) : (
                    <span className="inline-block px-3 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">Libre</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
