"use client";
import React from "react";

export default function RoomCard({ room }: { room: any }) {
  const occupants = (room.users || []).length;
  const capacity = Number(room.roomNumOfBed || 0);

  const getStatusColor = (status: any) => {
    switch ((status || "").toLowerCase()) {
      case "disponible":
        return "bg-green-100 text-green-800 border-green-200";
      case "occupée":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const statusText = room?.roomStatus
    ? String(room.roomStatus).charAt(0).toUpperCase() + String(room.roomStatus).slice(1)
    : "";

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex flex-col">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-[#003366]">Chambre {room.roomNumber}</h4>
          <div className="text-sm text-gray-600">{room.roomType} • Étage {room.roomFloor}</div>
        </div>
        <div className="w-28 h-20 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
          {room.roomImage ? (
            // If you don't have images, keep a placeholder
            <img src={room.roomImage} alt={`Chambre ${room.roomId}`} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">Aucune image</div>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-700 mt-3 flex-1">{room.roomDescription}</p>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          <span className="font-medium">{occupants}/{capacity}</span> occupants
        </div>
        <div className="text-sm">
          <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(room.roomStatus)}`}>
            {statusText}
          </span>
        </div>
      </div>
    </div>
  );
}
