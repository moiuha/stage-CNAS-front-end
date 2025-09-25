import { cookies } from "next/headers";

// Types
export interface AddRoomParams {
  photo: string;
  roomType: string;
  roomFloor: number;
  roomDescription?: string;
  roomNumOfBed?: number;
  roomNumber?: number;
}
export interface UpdateRoomParams {
  photo?: string;
  roomType?: string;
  roomFloor?: number;
  roomDescription?: string;
  roomNumOfBed?: number;
  roomNumber?: number;
}
export interface BookRoomParams {
    userId: any; 
    roomId: any;
  checkInDate: string;  
  checkOutDate: string; 
}
// Add Room (ADMIN)
export async function addRoom(data: AddRoomParams) {
  const token = (await cookies()).get("token")?.value;
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  const res = await fetch("https://protective-acceptance-production.up.railway.app/rooms/add", {
    method: "POST",
    headers,
    body: formData,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return await res.json();
}
// Get All Rooms (public)
export async function getAllRooms() {

    
  const res = await fetch("https://protective-acceptance-production.up.railway.app/rooms/all", {
    cache: "no-store",
  });
  
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return await res.json();
}
// Get Room Types (public)
export async function getRoomTypes() {
  const res = await fetch("https://protective-acceptance-production.up.railway.app/rooms/types", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return await res.json();
}
// Get Room By Id (public)
export async function getRoomById(roomId : any) {
  const res = await fetch(`https://protective-acceptance-production.up.railway.app/rooms/room-by-id/${roomId}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return await res.json();
}
// Get All Available Rooms (public)
export async function getAvailableRooms() {
  const res = await fetch("https://protective-acceptance-production.up.railway.app/rooms/all-available-rooms", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return await res.json();
}
// Update Room (ADMIN)
export async function updateRoom(roomId: number, data: UpdateRoomParams) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  const res = await fetch(`https://protective-acceptance-production.up.railway.app/rooms/update/${roomId}`, {
    method: "PUT",
    headers,
    body: formData,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return await res.json();
}
// Delete Room (ADMIN)
export async function deleteRoom(roomId: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`https://protective-acceptance-production.up.railway.app/rooms/delete/${roomId}`, {
    method: "DELETE",
    headers,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return await res.json();
}
// Book Room (public)
export async function bookRoom(data: BookRoomParams) {
  const res = await fetch("https://protective-acceptance-production.up.railway.app/rooms/book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return await res.json();
}


export interface CancelBookingRequest {
  userId: number;
  roomId: number;
}

export async function cancelBooking(data: CancelBookingRequest) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const res = await fetch("https://protective-acceptance-production.up.railway.app/rooms/cancel", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return await res.json();
}
