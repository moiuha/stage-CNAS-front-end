'use server';

import { updateRoom, deleteRoom } from '../../../services/room';

export async function updateRoomAction(roomId: number, data: any) {
  
  try {
    const result = await updateRoom(roomId, data);
    return { success: true, result };
  } catch (error) {
    return  'Erreur lors de la mise à jour.' ;
  }
}

export async function deleteRoomAction(roomId: number) {

  try {
    const result = await deleteRoom(roomId);
    return { success: true, result };
  } catch (error) {
    return  'Erreur lors de la suppression.' ;
  }
}
