"use client";
import React, { useTransition } from "react";
import { deleteUserAction } from "../admin/adminUserInfo/[id]/actions";
import { useRouter } from "next/navigation";

export default function DeleteUserButton({ userId, onDeleted }: { userId: string, onDeleted?: () => void }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      startTransition(async () => {
        try {
          await deleteUserAction(userId);
          alert("Utilisateur supprimé avec succès !");
          
          if (onDeleted) onDeleted();
          router.replace("/admin/adminUserManagement");
        } catch {
          alert("Échec de la suppression de l'utilisateur.");
        }
      });
    }
  };

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 border border-red-600 transition-all duration-150 text-sm"
      style={{ minWidth: 140, marginTop: 24 }}
    >
      {isPending ? "Suppression..." : "Supprimer l'utilisateur"}
    </button>
  );
}