"use client";
import React, { useTransition } from "react";
import { CancelBookingRequest } from "../services/room";
import { cancelBookingAction } from "../User/userRoom/actions";
import { useRouter } from "next/navigation";
import { any } from "zod";

interface AdminRemoveUserButtonProps {
  data?: CancelBookingRequest | null;
  
}

export default function AdminRemoveUserButton({ data }: AdminRemoveUserButtonProps) {
  const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const handleRemove = () => {
      startTransition(async () => {
        const res = await cancelBookingAction(data as any);
        if (res?.error) {
          alert(res.error || "Erreur lors de l'annulation.");
        } else {
          alert("Réservation annulée avec succès !");
          router.refresh();
        }
      });
    };

  return (
    <button
      className="px-3 py-1 rounded bg-[#c0392b] text-white font-medium hover:bg-[#a93226] transition border border-[#c0392b]"
      disabled={isPending || !data}
      onClick={handleRemove}
    >
      {isPending ? "Retrait..." : "Retirer"}
    </button>
  );
}