import React from "react";
import Link from "next/link";
import { getRoomById } from "../../services/room";
import { getLoggedInUserProfile } from "../../services/user";
import CancelBookingButton from "../../components/CancelBookingButton";

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

function initials(name?: string) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default async function RoomPage() {
  // get user profile (server-side)
  const res2 = await getLoggedInUserProfile();
  const user = res2?.user;

  // If user has no room, show a friendly page
  const userRoom = user?.room;
  if (!userRoom || !userRoom.roomId) {
    return (
      <div className=" bg-white rounded-lg shadow-lg border border-gray-200 p-8 mt-8 text-center">
        <h1 className="text-2xl font-bold text-[#004080] mb-4">Vous n'avez pas de chambre</h1>
        <p className="text-gray-700 mb-6">Nous n'avons trouvé aucune chambre associée à votre compte.</p>
        <div className="flex justify-center gap-4">
          <Link href="/" className="px-4 py-2 bg-[#004080] text-white rounded-lg">Voir les chambres disponibles</Link>
          <Link href="/support" className="px-4 py-2 border rounded-lg">Contacter l'administration</Link>
        </div>
      </div>
    );
  }

  // We have a roomId — fetch room data (guard with try/catch)
  const roomId = Number(userRoom.roomId);
  let room: any = null;
  try {
    const res1 = await getRoomById(roomId);
    room = res1.room || res1.roomData || res1.roomInfo || res1 || null;
  } catch (err) {
    return (
      <div className=" bg-white rounded-lg shadow-lg border border-gray-200 p-8 mt-8 text-center">
        <h1 className="text-xl font-semibold text-red-600 mb-4">Impossible de récupérer la chambre</h1>
        <p className="text-gray-600 mb-6">Une erreur est survenue lors de la récupération des informations de la chambre. Réessayez plus tard ou contactez l'administration.</p>
        <div className="flex justify-center gap-4">
          <Link href="/" className="px-4 py-2 border rounded-lg">Accueil</Link>
          <Link href="/support" className="px-4 py-2 bg-[#004080] text-white rounded-lg">Contacter l'administration</Link>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className=" bg-white rounded-lg shadow-lg border border-gray-200 p-8 mt-8 text-center">
        <h1 className="text-2xl font-bold text-[#004080] mb-4">Chambre introuvable</h1>
        <p className="text-gray-700 mb-6">La chambre liée à votre compte semble introuvable. Contactez l'administration si ce problème persiste.</p>
        <Link href="/" className="px-4 py-2 bg-[#004080] text-white rounded-lg">Accueil</Link>
      </div>
    );
  }

  const payload = user?.userId && roomId ? { userId: user.userId, roomId } : null;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 ">
      {/* Back button */}
      <div className="flex items-center mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-[#004080] hover:text-[#003366] font-medium px-2 py-1 rounded border border-[#e3eaf3] bg-[#f6fafd] shadow-sm w-max text-sm transition-colors duration-150"
          aria-label="Back to home"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" aria-hidden className="inline-block">
            <path d="M15 19l-7-7 7-7" stroke="#004080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Accueil
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Image */}
        <div className="md:w-1/2 w-full flex justify-center items-stretch">
          <img
            src={room?.roomImage ?? "/placeholder-room.png"}
            alt={`${room?.roomType ?? "Chambre"} image`}
            className="rounded-lg border border-gray-200 shadow-md w-full h-full object-cover max-w-3xl md:h-auto md:min-h-[500px] md:max-h-[700px]"
            style={{ minHeight: '500px', height: '100%' }}
          />
        </div>

        {/* Info & booking */}
        <div className="md:w-1/2 w-full flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#004080] mb-2">
              Étage {room?.roomFloor ?? "-"} — Chambre {room?.roomNumber ?? room?.roomId ?? "-"}
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

              <span className="ml-auto text-sm text-gray-500">Lits: <strong className="text-gray-800">{room?.roomNumOfBed ?? "-"}</strong></span>
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

            {/* DETAILS GRID (room number, floor, capacity, occupancy) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="bg-[#f6fafd] border border-[#e3eaf3] rounded-lg p-3">
                <div className="text-xs text-gray-500">Numéro De La Chambre</div>
                <div className="text-sm font-medium text-gray-800">{room?.roomNumber ?? room?.roomId ?? "-"}</div>
              </div>
              <div className="bg-[#f6fafd] border border-[#e3eaf3] rounded-lg p-3">
                <div className="text-xs text-gray-500">Étage</div>
                <div className="text-sm font-medium text-gray-800">{room?.roomFloor ?? "-"}</div>
              </div>
              <div className="bg-[#f6fafd] border border-[#e3eaf3] rounded-lg p-3">
                <div className="text-xs text-gray-500">Capacité (lits)</div>
                <div className="text-sm font-medium text-gray-800">{room?.roomNumOfBed ?? "-"}</div>
              </div>
              <div className="bg-[#f6fafd] border border-[#e3eaf3] rounded-lg p-3">
                <div className="text-xs text-gray-500">Occupancy</div>
                <div className="text-sm font-medium text-gray-800">{(room?.users?.length ?? 0)}/{room?.roomNumOfBed ?? 0}</div>
              </div>
            </div>

            {/* Occupants / Utilisateurs section - lively cards */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-medium text-gray-700">Occupants / Utilisateurs</div>
                  <div className="text-xs text-gray-500">Liste des personnes assignées à cette chambre</div>
                </div>
                <div className="text-sm text-gray-500">{(room?.users?.length ?? 0)}/{room?.roomNumOfBed ?? 0}</div>
              </div>

              {Array.isArray(room?.users) && room.users.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {room.users.map((u: any) => (
                    <li key={u.userId} className="flex items-center gap-3 bg-[#f6fafd] border border-[#e3eaf3] rounded-lg p-3">
                      <div className="w-12 h-12 rounded-full bg-[#004080] text-white flex items-center justify-center font-semibold text-lg shadow">
                        {initials(`${u.firstName ?? ""} ${u.lastName ?? ""}`)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-gray-800">{u.firstName} {u.lastName}</div>
                          <div className="text-xs text-gray-500">{u.role ?? "Utilisateur"}</div>
                        </div>
                        <div className="text-xs text-gray-600">
                          {u.email ?? ""}
                          {u.phoneNumber ? <span className="ml-2 text-gray-400">• {u.phoneNumber}</span> : null}
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          {u.checkInDate ? `Arrivée: ${u.checkInDate}` : null}
                          {u.checkOutDate ? <span className="ml-2">• Départ: {u.checkOutDate}</span> : null}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-gray-500 bg-[#f8fbff] border border-[#eef6ff] rounded-md p-3">
                  Aucun utilisateur pour le moment.
                </div>
              )}
            </div>
          </div>

          {/* Cancel button / booking actions */}
          <div className="mt-4">
            <CancelBookingButton data={payload} />
          </div>
        </div>
      </div>
    </div>
  );
}
