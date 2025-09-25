// app/admin/dashboard/page.tsx
import React from "react";
import StatCard from "../../components/adminDashboard/StatCard";
import RoomOverview from "../../components/adminDashboard/RoomOverview";
import UserTable from "../../components/adminDashboard/UserTable";
import RoomCard from "../../components/adminDashboard/RoomCard";
import { getAllUsers } from "../../services/user";
import { getAllRooms } from "../../services/room";

type User = {
  userId: number;
  firstName: string;
  lastName: string;
  phoneNum: string;
  email: string;
  role: "USER" | "ADMIN";
  checkInDate?: string | null;
  checkOutDate?: string | null;
  room?: { roomId: number; roomType: string } | null;
};

type Room = {
  roomId: number;
  roomType: string;
  roomDescription: string;
  roomStatus: "AVAILABLE" | "BOOKED" | "PARTIAL";
  roomImage?: string;
  roomNumOfBed: number;
  roomFloor: number;
  users: User[];
};

export default async function AdminDashboardPage() {
 
  const res = await getAllUsers();
  const users = res.userList ;

  const res1 = await getAllRooms();
  const rooms = res1.roomList ; 
 
  const totalUsers = users.length;
  const totalAdmins = users.filter((u) => u.role === "ADMIN").length;
  const totalRooms = rooms.length;
  const availableRooms = rooms.filter((r) => r.roomStatus === "AVAILABLE").length;
  const occupiedRooms = rooms.filter((r) => r.roomStatus !== "AVAILABLE").length;
  const types = Array.from(new Set(rooms.map((r) => r.roomType)));

  
  return (
    <main className="min-h-screen  ">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#004080]">Tableau de bord Administrateur</h1>
            <p className="text-gray-700 mt-1">Bienvenue sur l'espace d'administration. Gérez les chambres, les utilisateurs et les réservations.</p>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard title="Utilisateurs" value={totalUsers} subtitle={`${totalAdmins} admins`} />
          <StatCard title="Chambres totales" value={totalRooms} subtitle={`${availableRooms} disponibles`} />
          <StatCard title="Chambres disponibles" value={availableRooms} subtitle={`${occupiedRooms} occupées`} />
          <StatCard title="Types de chambre" value={types.length} subtitle={types.join(", ")} smallText />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-[#003366]">Tous les utilisateurs</h2>
              <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">{totalUsers} utilisateurs</div>
            <a
            href="/admin/adminUserManagement"
            className="text-[#004080] text-sm border-b border-[#004080] pb-0.5 hover:text-[#003366] transition bg-transparent rounded"
            style={{ background: "none" }}
            >
            Voir tous les utilisateurs
            </a>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <UserTable users={users.slice(0, 10)} />
            </div>
          </div>

          <aside>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-[#003366]">Aperçu des chambres</h2>
            </div>
            <div className="space-y-4">
              <RoomOverview rooms={rooms} />
            </div>
          </aside>
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-[#003366]">Toutes les chambres</h3>
            <a
              href="/admin/adminRoomsManagement"
              className="text-[#004080] text-sm border-b border-[#004080] pb-0.5 hover:text-[#003366] transition bg-transparent rounded"
              style={{ background: "none" }}
            >
              Voir toutes les chambres
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.slice(0, 6).map((r) => (
              <RoomCard key={r.roomId} room={r} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
