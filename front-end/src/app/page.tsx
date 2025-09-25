// app/page.tsx
import RoomsListClient from "./components/RoomsListClient";
import { getAllRooms } from "./services/room"; // your existing service

export default async function Home() {
  // server-side fetch
  const res = await getAllRooms();
  const rooms = res?.roomList ?? [];

  return (
    <main className="px-4 sm:px-6 lg:px-8 ">
      {/* Page header */}
      <header className="mb-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-[#004080]">Toutes les chambres</h1>
            <p className="mt-2 text-gray-700 max-w-2xl">
              Parcourez les chambres disponibles — recherchez par type, numéro de chambre ou étage.
              Le design est simple et officiel pour correspondre à l'identité du site.
            </p>
          </div>
        </div>
      </header>

      {/* Client-side list with search & pagination */}
      <RoomsListClient initialRooms={rooms} />
    </main>
  );
}
