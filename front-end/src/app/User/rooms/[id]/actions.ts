"use server";

import { bookRoom } from "../../../services/room";
import { getToken } from "../../../lib/api";

export async function bookRoomAction(formData: FormData) {
  const token = await getToken();
  if (!token) throw new Error("Unauthorized");

   const data = {
    userId: formData.get("userId"),
    roomId: formData.get("roomId"),
    checkInDate: String(formData.get("checkInDate")),
    checkOutDate: String(formData.get("checkOutDate")),
  };



  const res = await bookRoom(data);
  return res;
}
