'use client';

import React, { useState, useTransition } from "react";
import { updateRoomAction } from "../admin/adminRoomInfo/[id]/actions";

type RoomPayload = {
  roomFloor?: number | string;
  roomId?: number;
  roomType?: string;
  roomDescription?: string;
  roomNumOfBed?: number | string;
  roomStatus?: string;
  roomImage?: string | null;
  [k: string]: any;
};

interface UpdateRoomButtonProps {
  roomId: number;
  data?: RoomPayload | null;
}

export default function UpdateRoomButton({ roomId, data }: UpdateRoomButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [saving, setSaving] = useState(false);

  const readLocalStorage = (): RoomPayload => {
    try {
      const imageKey = `roomImage_${roomId}`;
      const localKey = `room_local_${roomId}`;

      const roomImage = typeof window !== 'undefined' ? localStorage.getItem(imageKey) : null;
      const roomLocalRaw = typeof window !== 'undefined' ? localStorage.getItem(localKey) : null;

      let roomLocal: Record<string, any> = {};
      if (roomLocalRaw) {
        try {
          roomLocal = JSON.parse(roomLocalRaw);
        } catch {
          roomLocal = {};
        }
      }

      const result: RoomPayload = { ...roomLocal };
      if (roomImage) result.roomImage = roomImage;
      result.roomId = roomId;
      return result;
    } catch (err) {
      console.error('Error reading localStorage for room:', err);
      return { roomId };
    }
  };

  const normalizeNumbers = (obj: RoomPayload): RoomPayload => {
    const copy = { ...obj };
    if (copy.roomFloor != null && typeof copy.roomFloor === 'string') {
      const n = parseInt(copy.roomFloor as string, 10);
      copy.roomFloor = Number.isNaN(n) ? copy.roomFloor : n;
    }
    if (copy.roomNumOfBed != null && typeof copy.roomNumOfBed === 'string') {
      const n = parseInt(copy.roomNumOfBed as string, 10);
      copy.roomNumOfBed = Number.isNaN(n) ? copy.roomNumOfBed : n;
    }
    return copy;
  };

  const handleUpdate = () => {
    
    if (saving) return;

    startTransition(() => {
      (async () => {
        setSaving(true);
        try {
          
          const local = readLocalStorage();

          
          const mergedRaw: RoomPayload = {
            ...(data ?? {}),
            ...local,
            roomId, 
          };

          const finalPayload = normalizeNumbers(mergedRaw);

          console.debug('Updating room with payload:', finalPayload);

          const res = await updateRoomAction(roomId, finalPayload);

          if (res && res.success) {
            alert('Chambre mise à jour avec succès !');
           
            window.location.reload();
          } else {
            alert(res?.error || 'Erreur lors de la mise à jour.');
          }
        } catch (err) {
          console.error('Update failed', err);
          alert('Erreur lors de la mise à jour.');
        } finally {
          setSaving(false);
        }
      })();
    });
  };

  const disabled = isPending || saving;

  return (
    <button
      className="px-5 py-2 rounded-lg bg-[#004080] text-white font-semibold shadow hover:bg-[#003366] border border-[#004080] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#004080] focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
      type="button"
      disabled={disabled}
      onClick={handleUpdate}
    >
      {disabled ? "Mise à jour..." : "Mettre à jour"}
    </button>
  );
}
