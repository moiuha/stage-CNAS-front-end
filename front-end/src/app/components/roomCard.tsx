import Link from "next/link";
import React from "react";

export default function RoomCard({ room }) {
  if (!room) {
    return (
      <div className="bg-gray-100 rounded-lg shadow-md border border-gray-200 p-6">
        <div className="text-gray-500 text-center">No room data available</div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "disponible":
        return "bg-green-100 text-green-800 border-green-200";
      case "occupée":
        return "bg-red-100 text-red-800 border-red-200";
      
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRoomTypeIcon = (type) => {
    switch ((type || "").toLowerCase()) {
      case "conference":
        return "🏢";
      case "single":
        return "🛏️";
      case "double":
        return "🛏️🛏️";
      case "suite":
        return "🏨";
      default:
        return "🏠";
    }
  };

  const titleRoomNumber = room.roomNumber  ?? "—";
  const floor = room.roomFloor ?? "—";
  const statusText = room.roomStatus ?? "unknown";

  const userCount = Array.isArray(room.users) ? room.users.length : 0;
  const bedCount = room.roomNumOfBed ?? 0;
  const occupantsDisplay = `${userCount}/${bedCount}`;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        
        <div className="flex-shrink-0 relative">
          <img
            src={room.roomImage}
            alt={`${room.roomType || "Room"} preview`}
            className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover rounded-lg border border-gray-200 shadow-sm"
          />
        
          {titleRoomNumber && (
            <span className="absolute -bottom-2 -right-2 bg-white border border-gray-200 text-xs px-2 py-0.5 rounded-full shadow-sm">
              #{titleRoomNumber}
            </span>
          )}
        </div>

       
        <div className="flex-1 w-full flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getRoomTypeIcon(room.roomType)}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Chambre {titleRoomNumber} — Étage {floor}
                  </h3>
                  <div className="text-sm text-gray-600 mt-0.5 capitalize">
                    {room.roomType || "Type inconnu"}
                  </div>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(statusText)}`}>
                {statusText}
              </span>
            </div>

            <p className="text-gray-600 text-sm mt-2 mb-3 leading-relaxed">{room.roomDescription || "No description available"}</p>
          </div>

          <div className="flex flex-row items-end sm:gap-4 gap-2 mt-2">
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 px-3 py-2 rounded-lg w-max">
              <span className="text-blue-600 font-medium text-sm">Lits:</span>
              <span className="text-blue-800 font-semibold">{bedCount === 0 ? "Aucun" : bedCount}</span>
            </div>

           
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-600">Occupants:</span>
              <span className="font-semibold text-gray-800">{occupantsDisplay}</span>
            </div>

            <div className="text-xs text-gray-500">Status updated: {room.lastUpdated || "N/A"}</div>

            <div className="flex-1 flex justify-end">
              <Link
                href={`/User/rooms/${room.roomId}`}
                className="bg-[#004080] hover:bg-[#003366] text-white font-semibold px-5 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#004080] focus:ring-offset-2 border border-[#004080] transition-all duration-150 text-sm flex items-center justify-center"
                style={{ minWidth: 120 }}
                aria-label="Voir la salle"
              >
                Voir la salle
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

