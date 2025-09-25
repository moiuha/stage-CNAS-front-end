// app/admin/room-management/page.tsx
import React from "react";
import RoomCard from "../../components/adminRoomCard";
import Link from "next/link";
import { getAllRooms } from "../../services/room";


export default async function RoomManagementPage() {
    const res = await getAllRooms();
    let rooms = res.roomList || [];
   
   
    if (!Array.isArray(rooms)) {
      rooms = [];
    }

 
    
    
    const mappedRooms = rooms.map((r : any) => ({
      roomId: r.roomId,
      roomType: r.roomType,
      roomDescription: r.roomDescription,
      roomStatus: r.roomStatus,
      roomNumOfBed: r.roomNumOfBed,
      roomFloor: r.roomFloor,
      users: r.users,
      roomNumber: r.roomNumber,
    }));
     
    return (
    <main className=" max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#0b2540]">Gestion des chambres</h1>
          <p className="text-sm text-gray-500 mt-1">
            Aperçu de toutes les chambres. Cliquez sur une carte pour voir les détails ou gérer les réservations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/creatRoom"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#004080] hover:bg-[#003366] text-white rounded-md shadow-sm transition"
          >
            + Créer une chambre
          </Link>
        </div>
      </div>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mappedRooms.map((r : any) => (
            <RoomCard
              key={r.roomId}
              room={r}
            />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-end gap-3">
          <button className="px-3 py-1 rounded-md border border-gray-200 bg-white text-sm">Précédent</button>
          <div className="px-3 py-1 rounded-md bg-white text-sm text-gray-600">Page 1 sur 1</div>
          <button className="px-3 py-1 rounded-md border border-gray-200 bg-white text-sm">Suivant</button>
        </div>
      </section>
    </main>
  );
}
