"use client";
import React from "react";
import { useRouter } from "next/navigation";

type User = {
  userId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: string;
  room?: { roomId: number } | null;
};

export default function UserTable({ users }: { users: User[] }) {
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto text-left">
        <thead>
          <tr className="text-sm text-gray-500">
            <th className="p-3">Nom</th>
            <th className="p-3 hidden sm:table-cell">Email</th>
            <th className="p-3">Téléphone</th>
            <th className="p-3">Statut</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.userId} className="cursor-pointer hover:bg-gray-50" onClick={() => router.push(`/admin/adminUserInfo/${u.userId}`)}>
              <td className="p-3">
                <div className="font-medium text-gray-800">{u.firstName} {u.lastName}</div>
                <div className="text-xs text-gray-500 sm:hidden">{u.email}</div>
              </td>
              <td className="p-3 hidden sm:table-cell text-sm text-gray-600">{u.email}</td>
              <td className="p-3 text-sm text-gray-600">{u.phoneNumber}</td>
              <td className="p-3">
                {u.room ? (
                  <span className="inline-block px-2 py-1 rounded-full text-xs bg-yellow-50 text-yellow-800 border border-yellow-100">Réservé</span>
                ) : (
                  <span className="inline-block px-2 py-1 rounded-full text-xs bg-green-50 text-green-800 border border-green-100">Non Réservé</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
