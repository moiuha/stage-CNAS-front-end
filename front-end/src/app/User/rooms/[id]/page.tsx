import React from 'react'
import { getRoomById } from '../../../services/room'; 
import Link from 'next/link';
import BookingFormWrapper from '../../../components/BookingFormWrapper';
import { getLoggedInUserProfile } from '../../../services/user';


function getStatusColor(status?: string) {
  const s = (status || "").toLowerCase();
  switch (s) {
    case "disponible":
    case "available":
      return "bg-green-100 text-green-800 border-green-200";
    case "occupée":
    case "occupee":
    case "booked":
    case "occupied":
      return "bg-red-100 text-red-800 border-red-200";
    case "partielle":
    case "partial":
    case "maintenance":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

function formatStatusLabel(status?: string) {
  if (!status) return "—";
  const s = String(status);
  return s.charAt(0).toUpperCase() + s.slice(1);
}


export default async function RoomPage({ params }) {
  const { id } = params;
  const res1 = await getRoomById(Number(id));
  const room = res1.room || res1.roomData || res1.roomInfo || res1;
  if (!room) {
    return <div className="text-center text-red-600 mt-10">Room not found</div>;
  }

  const res2 = await getLoggedInUserProfile();
  const userId = res2.user?.userId;
  const userHasRoom = Boolean(res2.user?.room && res2.user.room.roomId);

  console.log("RoomID :", room.roomId);
  console.log("UserID :", userId);
  console.log("User has room :", userHasRoom);

  return (
    <div className="  bg-white rounded-lg shadow-lg border border-gray-200 p-6">
      {/* Back button row */}
      <div className="flex items-center mb-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-[#004080] hover:text-[#003366] font-medium px-2 py-1 rounded border border-[#e3eaf3] bg-[#f6fafd] shadow-sm w-max text-sm transition-colors duration-150"
          aria-label="Back to home"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" aria-hidden className="inline-block"><path d="M15 19l-7-7 7-7" stroke="#004080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Accueil
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Image section */}
        <div className="md:w-2/3 w-full flex justify-center items-stretch">
          <img
            src={room.roomImage}
            alt={`${room.roomType} image`}
            className="rounded-lg border border-gray-200 shadow-md w-full h-full object-cover max-w-3xl md:h-auto md:min-h-[500px] md:max-h-[700px]"
            style={{ minHeight: '500px', height: '100%' }}
          />
        </div>

        {/* Info & booking section */}
        <div className="md:w-1/2 w-full flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#004080] mb-2">
              Étage {room.roomFloor} — Chambre {room.roomNumber}
            </h1>
            {/* ROOM TYPE & STATUS ROW */}
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full text-sm font-medium border bg-[#f0f7ff] text-[#004080] border-[#e3f0ff]">
                Type De Chambre : {room?.roomType ? String(room.roomType).toUpperCase() : "—"}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(room?.roomStatus)}`}
                title={`Statut: ${formatStatusLabel(room?.roomStatus)}`}
              >
                {formatStatusLabel(room?.roomStatus)}
              </span>

              
            </div>

            {/* DESCRIPTION SECTION */}
            <div className="mb-4 bg-[#fffefe] border border-[#e8f1fb] rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-[#004080]">Description</h3>
                <div className="text-xs text-gray-500">Détails de la chambre</div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {room?.roomDescription ?? "Aucune description disponible pour cette chambre."}
              </p>
            </div>


            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">Lits: {room.roomNumOfBed}</span>
              
            </div>

            {/* Users list */}
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Occupants / Utilisateurs</div>
              {Array.isArray(room.users) && room.users.length > 0 ? (
                <ul className="space-y-2">
                  {room.users.map(u => (
                    <li key={u.userId} className="text-sm text-gray-600">
                      {u.firstName} {u.lastName} {u.phoneNumber ? <span className="text-xs text-gray-400">({u.phoneNumber})</span> : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-gray-500">Aucun utilisateur</div>
              )}
            </div>
          </div>

      
          <BookingFormWrapper roomId={room.roomId} userId={userId} userHasRoom={userHasRoom} />
        </div>
      </div>
    </div>
  );
}
