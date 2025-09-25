export default function ProfileHeader() {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-[#004080]">Mon profil</h1>
        <p className="mt-1 text-sm text-gray-600">
          Ici vous pouvez voir vos informations personnelles (lecture seule).
        </p>
      </div>
    </header>
  );
}
