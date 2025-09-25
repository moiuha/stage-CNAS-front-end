'use client';
import React, { useTransition } from "react";
import { deleteRoomAction } from "../admin/adminRoomInfo/[id]/actions";
import { useRouter } from "next/navigation";

export default function DeleteRoomButton({ roomId }: { roomId: number }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette chambre ?")) {
      startTransition(async () => {
        const res = await deleteRoomAction(roomId);
        if (typeof res === "object" && res !== null && "success" in res && res.success) {
          alert("Chambre supprimée avec succès !");
          router.replace("/admin/adminRoomsManagement");
        } else {
          alert("Erreur lors de la suppression.");
        }
      });
    }
  };

  return (
    <button
      className="px-5 py-2 rounded-lg bg-[#B22234] text-white font-semibold shadow hover:bg-[#8B1A1A] border border-[#B22234] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#B22234] focus:ring-offset-2"
      type="button"
      disabled={isPending}
      onClick={handleDelete}
    >
      {isPending ? "Suppression..." : "Supprimer"}
    </button>
  );
}
