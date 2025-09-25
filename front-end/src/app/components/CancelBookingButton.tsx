"use client";
import React, { useTransition } from "react";
import { cancelBookingAction } from "../User/userRoom/actions";
import { CancelBookingRequest } from "../services/room";
import { useRouter } from "next/navigation";

interface CancelBookingButtonProps {
  data?: CancelBookingRequest | null;
}

export default function CancelBookingButton({ data }: CancelBookingButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCancel = () => {
    startTransition(async () => {
      const res = await cancelBookingAction(data);
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
      type="button"
      className="px-5 py-2 rounded-lg bg-[#c0392b] text-white font-semibold shadow hover:bg-[#a93226] border border-[#c0392b] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#c0392b] focus:ring-offset-2"
      disabled={isPending}
      onClick={handleCancel}
    >
      {isPending ? "Annulation..." : "Annuler la réservation"}
    </button>
  );
}