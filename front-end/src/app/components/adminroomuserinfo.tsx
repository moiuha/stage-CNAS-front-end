import React from "react";
import AdminRemoveUserButton from "./adminRemoveUserBotton";
import { CancelBookingRequest } from "../services/room";

interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email?: string;
}

interface AdminRoomUserInfoProps {
  users: User[];
  roomId?: number;
}



export default function AdminRoomUserInfo({ users, roomId }: AdminRoomUserInfoProps) {


    
  return (
    <section className="bg-[#f6fafd] rounded-xl shadow border border-[#e3eaf3] p-6 mb-6">
      <h2 className="text-xl font-bold text-[#004080] mb-4">Occupants / Utilisateurs</h2>
      {Array.isArray(users) && users.length > 0 ? (
        <ul className="space-y-3">
          {users.map(u => (
            <li key={u.userId} className="flex items-center justify-between bg-white rounded-lg shadow px-4 py-2 border border-gray-200">
              <div>
                <span className="font-semibold text-gray-800">{u.firstName} {u.lastName}</span>
                {u.email && <span className="ml-2 text-xs text-gray-500">({u.email})</span>}
              </div>

                 <AdminRemoveUserButton data={{ roomId: Number(roomId), userId: u.userId }} />

            </li>
          ))}
        </ul>
      ) : (
        <div className="text-sm text-gray-500">Aucun utilisateur</div>
      )}
    </section>
  );
}
