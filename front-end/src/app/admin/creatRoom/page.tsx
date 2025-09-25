
import React from "react";
import dynamic from "next/dynamic";

const RoomForm = dynamic(() => import("../../components/roomForm"), {
  
});

export default function CreateRoomPage() {
  return (
    <main className="">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-[#004080]">Créer une chambre</h1>
        <p className="text-sm text-gray-600 mt-1">
          Ajoutez une nouvelle chambre au système. Seuls les administrateurs peuvent accéder à cette page.
        </p>
      </header>

      <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <RoomForm />
      </section>
    </main>
  );
}
