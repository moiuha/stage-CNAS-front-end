'use server';
import { addRoom } from "../../services/room";



export async function createRoomAction(payload : any) {
  return await addRoom(payload);
}