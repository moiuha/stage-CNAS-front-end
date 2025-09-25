/**
 * Read-only information card.
 * The fields are rendered as labels + static text (not editable).
 */

export default function ProfileInfo({ user }: { user: any }) {
  const hasBooking = !!(user.room || user.checkInDate || user.checkOutDate);

  return (
    <div className="space-y-8">
      {/* Personal info */}
  <section className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200">
  <h2 className="text-2xl font-bold text-gray-800 mb-6 tracking-tight flex items-center gap-2">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.418 0-8 2.239-8 5v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3c0-2.761-3.582-5-8-5z" stroke="#004080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Informations personnelles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Prénom" value={user.firstName ?? "-"} />
          <Field label="Nom" value={user.lastName ?? "-"} />
          <Field label="Téléphone" value={user.phoneNumber ?? "-"} />
          <Field label="Email" value={user.email ?? "-"} />
          <Field label="Rôle" value={user.role ?? "-"} />
          <Field label="Identifiant utilisateur" value={String(user.userId ?? "-")} />
        </div>
      </section>

      {/* Booking info - only show if not admin */}
      {user.role !== "ADMIN" && (
        <section className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 tracking-tight flex items-center gap-2">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M4 7V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1" stroke="#004080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="4" y="7" width="16" height="13" rx="2" stroke="#004080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Réservation / Hébergement
          </h3>

          {!hasBooking ? (
            <div className="mt-4 text-base text-gray-600 font-medium">Vous n'avez pas de chambre réservée pour le moment.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="text-sm text-gray-500 font-semibold mb-2">Chambre</div>
                {user.room ? (
                  <div className="space-y-2">
                    <Field label="Numéro de la chambre" value={String(user.room.roomNumber ?? "—")} />
                    <Field label="Type" value={user.room.roomType ?? "—"} />
                    <Field label="Étage" value={String(user.room.roomFloor ?? "—")} />
                    <Field label="Nombre de lits" value={String(user.room.roomNumOfBed ?? "—")} />
                    <Field label="Description" value={user.room.roomDescription ?? "—"} />
                  </div>
                ) : (
                  <div className="mt-2 text-gray-600">Aucune chambre associée.</div>
                )}
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="text-sm text-gray-500 font-semibold mb-2">Dates de séjour</div>
                <Field label="Date d'entrée" value={formatDate(user.checkInDate) ?? "—"} />
                <Field label="Date de sortie" value={formatDate(user.checkOutDate) ?? "—"} />
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

/* ---------- small helpers & presentational bits ---------- */

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="block text-xs font-semibold text-gray-700 tracking-wide uppercase">{label}</label>
      <div className="text-base text-gray-900 font-medium bg-gray-50 rounded px-2 py-1 border border-gray-200">{value}</div>
    </div>
  );
}

function formatPhone(phone: any) {
  if (!phone) return "-";
  // simple formatting for long numbers, adapt as needed
  const s = String(phone);
  if (s.length > 8) {
    return `+${s}`;
  }
  return s;
}

function formatDate(d: string | null | undefined) {
  if (!d) return null;
  try {
    const dt = new Date(d);
    // local date formatting (YYYY-MM-DD → readable)
    return dt.toLocaleDateString("fr-FR");
  } catch {
    return d;
  }
}
