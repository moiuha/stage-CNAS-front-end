import Link from "next/link";

import { User } from "../services/user";
type RoomCardProps = {
  room: {
    roomId: number;
    roomType: string;
    roomDescription: string;
    roomStatus: string;
    roomImage?: string;
    roomNumOfBed: number;
    roomFloor: number;
    roomNumber?: number;
    users?: User[];
    usersCount: number;
  };
};

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

export default function AdminRoomCard({ room }: RoomCardProps) {
  const userCount = Array.isArray(room.users) ? room.users.length : 0;
  console.log("Room users:", room.users);
  const occupancy = `${userCount}/${room.roomNumOfBed}`;
  const status = room.roomStatus;
  const statusColor = getStatusColor(status);

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 w-full max-w-sm mx-auto flex flex-col justify-between" style={{ minHeight: 170 }}>
      <div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold text-[#0b2540]">Chambre {room.roomNumber}</h3>
            <p className="text-xs text-gray-500 mt-1">{room.roomType} • Étage {room.roomFloor}</p>
          </div>
          <div className={`px-2 py-1 rounded text-xs font-medium ${statusColor}`}>
            {status}
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-2 line-clamp-1">{room.roomDescription?.split(".")[0]}</p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-xs text-gray-700">
          <span className="font-medium">{room.roomNumOfBed}</span>{" "}
          <span className="text-gray-500">lits •</span>{" "}
          <span className="font-medium">{userCount}</span>{" "}
          <span className="text-gray-500">occupants</span>
          <div className="text-xs text-gray-400 mt-1">Occupation : {occupancy}</div>
        </div>
        <Link
          href={`/admin/adminRoomInfo/${room.roomId}`}
          className="inline-block px-2 py-1 rounded border border-[#004080] text-[#004080] text-xs hover:bg-[#004080] hover:text-white transition"
        >
          Voir
        </Link>
      </div>
    </article>
  );
}
