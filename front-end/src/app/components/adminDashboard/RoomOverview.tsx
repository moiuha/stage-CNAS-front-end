"use client";
import React from "react";

export default function RoomOverview({ rooms }: { rooms: any[] }) {
  const total = rooms.length;
  const available = rooms.filter(r => r.roomStatus === "AVAILABLE").length;
  const occupied = total - available;

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-gray-800">Chambres</h4>
        <div className="text-sm text-gray-500">{total} au total</div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Disponibles</span>
          <span className="font-semibold text-[#004080]">{available}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Occupées</span>
          <span className="font-semibold text-[#004080]">{occupied}</span>
        </div>
        <div className="pt-3 text-s text-gray-800">Tous les types :</div>
        <div className="flex gap-2 pt-2 flex-wrap">
          {Array.from(new Set(rooms.map(r => r.roomType))).map((t,i) => (
            <span key={i} className="text-xs px-2 py-1 bg-blue-50 text-blue-800 rounded-md border border-blue-100">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
