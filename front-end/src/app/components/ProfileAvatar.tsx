export default function ProfileAvatar({
  initials,
  name,
  role,
}: {
  initials: string;
  name: string;
  role?: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div
          aria-hidden
          className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-xl font-semibold text-[#004080] shadow-sm"
        >
          {initials}
        </div>
        <div>
          <div className="text-lg font-medium text-gray-800">{name}</div>
          <div className="text-sm text-gray-500 mt-1">Rôle : <span className="font-medium text-gray-700">{role}</span></div>
        </div>
      </div>
    </div>
  );
}
