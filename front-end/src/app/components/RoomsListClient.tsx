// app/components/RoomsListClient.tsx
"use client";

import { useMemo, useState, useEffect } from "react";
import RoomCard from "./roomCard";

interface RoomsListClientProps {
  initialRooms: any[];
}

export default function RoomsListClient({ initialRooms }: RoomsListClientProps) {
  const [searchType, setSearchType] = useState("");
  const [searchNumber, setSearchNumber] = useState("");
  const [searchFloor, setSearchFloor] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 10;

  // Filter by type OR roomNumber OR roomFloor (partial matches)
  const filtered = useMemo(() => {
    const qType = searchType.trim().toLowerCase();
    const qNumber = searchNumber.trim().toLowerCase();
    const qFloor = searchFloor.trim().toLowerCase();

    return initialRooms.filter((r: any) => {
      const roomType = String(r.roomType ?? "").toLowerCase();
      const roomNumber = String(r.roomNumber ?? r.roomId ?? "").toLowerCase();
      const roomFloor = String(r.roomFloor ?? "").toLowerCase();

      const typeMatch = !qType || roomType.includes(qType);
      const numberMatch = !qNumber || roomNumber.includes(qNumber);
      const floorMatch = !qFloor || roomFloor.includes(qFloor);

      // If any of the three fields match the respective query, we include it.
      // If user entered multiple fields, all provided fields must match.
      const allProvidedMatch =
        (qType ? typeMatch : true) &&
        (qNumber ? numberMatch : true) &&
        (qFloor ? floorMatch : true);

      return allProvidedMatch;
    });
  }, [initialRooms, searchType, searchNumber, searchFloor]);

  useEffect(() => setCurrentPage(1), [searchType, searchNumber, searchFloor, initialRooms]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / roomsPerPage));
  const clampedPage = Math.min(Math.max(1, currentPage), totalPages);
  useEffect(() => {
    if (currentPage !== clampedPage) setCurrentPage(clampedPage);
  }, [clampedPage, currentPage]);

  const start = (clampedPage - 1) * roomsPerPage;
  const pageRooms = filtered.slice(start, start + roomsPerPage);

  return (
    <section className="space-y-6">
      {/* Search bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type de chambre</label>
            <input
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              placeholder="Ex : Single, Double, Suite"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004080]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Numéro de chambre</label>
            <input
              value={searchNumber}
              onChange={(e) => setSearchNumber(e.target.value)}
              placeholder="Ex : 101, 12..."
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004080]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Étage</label>
            <input
              value={searchFloor}
              onChange={(e) => setSearchFloor(e.target.value)}
              placeholder="Ex : 1, 2, 3..."
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004080]"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Résultats : <span className="font-medium text-gray-800">{filtered.length}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setSearchType(""); setSearchNumber(""); setSearchFloor(""); }}
              className="text-sm text-[#004080] hover:underline"
            >
              Effacer
            </button>
          </div>
        </div>
      </div>

      {/* Rooms list (stacked) */}
      <div className="space-y-4">
        {pageRooms.map((room: any) => (
          <RoomCard key={room.roomId ?? room.roomNumber ?? Math.random()} room={room} />
        ))}
      </div>

      {/* Pagination */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-between bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, clampedPage - 1))}
              disabled={clampedPage === 1}
              className="px-3 py-1 rounded border bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Précédent
            </button>

            {/* simple pages display (adaptive) */}
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              let page = Math.max(1, Math.min(totalPages, clampedPage - 2 + i));
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded border font-medium ${page === clampedPage ? "bg-[#004080] text-white" : "bg-white hover:bg-gray-50"}`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, clampedPage + 1))}
              disabled={clampedPage === totalPages}
              className="px-3 py-1 rounded border bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Suivant
            </button>
          </div>

          <div className="text-sm text-gray-500  px-3 py-1 rounded border border-gray-300 bg-white">
            Page {clampedPage} / {totalPages}
          </div>
        </div>
      )}

      {/* empty state */}
      {filtered.length === 0 && (
        <div className="max-w-3xl mx-auto bg-white rounded-lg border border-gray-200 p-6 text-center shadow-sm">
          <h3 className="text-xl font-semibold text-[#004080]">Aucune chambre trouvée</h3>
          <p className="text-gray-600 mt-2">Essayez d'élargir vos critères ou revenez plus tard.</p>
        </div>
      )}
    </section>
  );
}
