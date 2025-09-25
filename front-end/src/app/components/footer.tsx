// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 text-gray-700 border-t">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row md:justify-between gap-6">
        {/* Left: branding */}
        <div>
          <div className="text-lg font-semibold text-blue-800">CNAS</div>
          <div className="text-sm">Caisse Nationale des Assurances Sociales</div>
          <div className="text-xs text-gray-500 mt-2">Algérie</div>
        </div>

        {/* Middle: quick (non-linked) items */}
        <div className="flex flex-col text-sm space-y-1">
          <div className="font-medium">Pages</div>
          <span className="text-gray-600">Modifier le profil</span>
          <span className="text-gray-600">Toutes les salles</span>
          <span className="text-gray-600">Ma salle</span>
        </div>

        {/* Right: contact / copyright */}
        <div className="text-sm">
          <div className="font-medium">Contact</div>
          <div className="text-gray-600">Support CNAS</div>
          <div className="text-gray-500 text-xs mt-3">© 2013 - 2025 Caisse Nationale des Assurances Sociales</div>
        </div>
      </div>
    </footer>
  )
}
