"use client";

import React, { use, useTransition } from "react";
import { bookRoomAction } from "../User/rooms/[id]/actions";
import { useRouter } from "next/navigation";

export default function BookingForm({ userId, roomId }: { userId: any; roomId: any }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    formData.append("userId", userId);
    formData.append("roomId", roomId);


    startTransition(async () => {
      try {
        await bookRoomAction(formData);
        alert("✅ Room booked successfully!");
        router.refresh();

      } catch (err) {
        alert("❌ Failed to book room");
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#f6fafd] border border-[#e3eaf3] rounded-lg p-4 mt-2 flex flex-col gap-4 shadow-sm"
    >
      <label className="font-medium text-gray-700">Date d'arrivée</label>
      <input
        type="date"
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#004080]"
        name="checkInDate"
        required
      />

      <label className="font-medium text-gray-700">Date de départ</label>
      <input
        type="date"
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#004080]"
        name="checkOutDate"
        required
      />

      <button
        type="submit"
        disabled={isPending}
        className="bg-[#004080] hover:bg-[#003366] text-white font-semibold px-5 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#004080] focus:ring-offset-2 border border-[#004080] transition-all duration-150 text-base mt-2"
      >
        {isPending ? "Réservation en cours..." : "Réserver la chambre"}
      </button>
    </form>
  );
}
