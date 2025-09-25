import React from 'react'
import { getRoomById } from '../../../services/room'; 
import Link from 'next/link';
import ChangeImageButton from '../../../components/ChangeImageButton';
import UpdateRoomButton from '../../../components/UpdateRoomButton';
import DeleteRoomButton from '../../../components/DeleteRoomButton';
import EditableLabel from '../../../components/EditableLabel';
import AdminRoomUserInfo from '../../../components/adminroomuserinfo';


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


export default async function RoomPage({ params  } : any) {
  const { id } = params;
  const res1 = await getRoomById(Number(id));
  const room = res1.room || res1.roomData || res1.roomInfo || res1;
  if (!room) {
    return <div className="text-center text-red-600 mt-10">Room not found</div>;
  }


return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 ">
        {/* Back button row */}
        <div className="flex items-center mb-2">
            <Link
                href="/admin/adminRoomsManagement"
                className="inline-flex items-center gap-1 text-[#004080] hover:text-[#003366] font-medium px-2 py-1 rounded border border-[#e3eaf3] bg-[#f6fafd] shadow-sm w-max text-sm transition-colors duration-150"
                aria-label="Back to home"
            >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" aria-hidden className="inline-block"><path d="M15 19l-7-7 7-7" stroke="#004080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Accueil
            </Link>
        </div>
        <div className="mb-4 text-gray-600 text-sm text-center">
            Vous pouvez modifier les informations en cliquant sur les libellés.
        </div>

        <div className="flex flex-col md:flex-row gap-8">
            {/* Image section */}
            <div className="md:w-1/2 w-full flex flex-col items-center justify-center">
                <img
                    src={room.roomImage}
                    alt={`${room.roomImage} image`}
                    className="rounded-lg border border-gray-200 shadow-md w-full h-full object-cover max-w-md md:h-auto md:min-h-[400px] md:max-h-[600px]"
                    style={{ minHeight: '400px', height: '100%' }}
                />
                <div className="mt-4 flex justify-center">
                    <ChangeImageButton roomId={room.roomId} />
                </div>
            </div>

            <div className="md:w-1/2 w-full flex flex-col justify-between">
                <div className="space-y-4">
                    <div
                        className={`inline-block px-3 py-1 rounded border font-semibold text-sm mb-2 ${getStatusColor(room.roomStatus)}`}
                    >
                        {room.roomStatus || "Inconnu"}
                    </div>
                    <EditableLabel label="Étage" value={room.roomFloor} roomId={room.roomId} field="roomFloor" />
                    <EditableLabel label="Chambre" value={room.roomNumber} roomId={room.roomId} field="roomNumber" />
                    <EditableLabel label="Type" value={room.roomType} roomId={room.roomId} field="roomType" />
                    <EditableLabel label="Description" value={room.roomDescription} roomId={room.roomId} field="roomDescription" />
                    <EditableLabel label="Nombre de lits" value={room.roomNumOfBed} roomId={room.roomId} field="roomNumOfBed" />
                    

                    <AdminRoomUserInfo users={room.users} roomId={room.roomId} />
                     

                    <div className="flex gap-3 mt-10 justify-end w-full">
                        <UpdateRoomButton roomId={room.roomId} data={room} />
                        <DeleteRoomButton roomId={room.roomId} />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

}