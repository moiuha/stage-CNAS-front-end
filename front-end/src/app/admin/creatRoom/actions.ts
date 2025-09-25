'use server';
import { addRoom } from "../../services/room";



export async function createRoomAction(payload) {
  return await addRoom(payload);
}