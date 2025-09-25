
"use client";

import React, { useState } from "react";
import TextInput from "../components/ui/textinput";
import TextArea from "../components/ui/textarea";
import NumberInput from "../components/ui/numberInput";
import Button from "../components/ui/buttons";
import Alert from "../components/ui/alert";
import { useRouter } from "next/navigation";

import { createRoomAction } from "../admin/creatRoom/actions";
import { div } from "framer-motion/client";

type FormState = {
  roomType: string;
  roomDescription: string;
  photo: string;
  roomNumber: string;      
  roomNumOfBed: string;
  roomFloor: string;
};

export default function RoomForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    roomType: "",
    roomDescription: "",
    photo: "",
    roomNumber: "",
    roomNumOfBed: "",
    roomFloor: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

 

  function onChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  function validate() {
    if (!form.roomType || form.roomType.trim() === "") return "Le type de chambre est requis";
    if (!form.roomNumber || isNaN(Number(form.roomNumber))) return "Le numéro de chambre est requis";
    if (!form.roomNumOfBed || isNaN(Number(form.roomNumOfBed))) return "Le nombre de lits est requis";
    if (!form.roomFloor || isNaN(Number(form.roomFloor))) return "L'étage est requis";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);
    const v = validate();
    if (v) {
      setErrorMsg(v);
      return;
    }

    setLoading(true);
    try {
      
      const payload = {
        roomType: form.roomType,
        roomDescription: form.roomDescription || "",
        photo: form.photo || "",
        roomNumber: Number(form.roomNumber),
        roomNumOfBed: Number(form.roomNumOfBed),
        roomFloor: Number(form.roomFloor),
      };

      

      const res = await createRoomAction(payload);
      if (res?.error || res?.message === "error") {
        setErrorMsg(res?.message ?? "Request failed");
      } else {
        setSuccessMsg("Chambre créée avec succès.");
        setForm({
          roomType: "",
          roomDescription: "",
          photo: "",
          roomNumber: "",
          roomNumOfBed: "",
          roomFloor: "",
        });


        router.replace("/admin/adminRoomsManagement")
      }
    } catch (err: any) {
      setErrorMsg(err?.message ?? "Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  return (

    
    <form onSubmit={handleSubmit} className="space-y-5">
      {successMsg && <Alert type="success" message={successMsg} />}
      {errorMsg && <Alert type="error" message={errorMsg} />}
      <div className="text-sm text-gray-500 mb-2">
        Les champs "Numéro de chambre", "Nombre de lits" et "Étage" n'acceptent que des chiffres. Seuls les numéros sont acceptés.
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          label="Type de chambre"
          value={form.roomType}
          onChange={(v) => onChange("roomType", v)}
          placeholder="ex: Double, Simple, Familiale"
          required
        />

        <NumberInput
          label="Numéro de chambre"
          value={form.roomNumber}
          onChange={(v) => {
            
            if (/^\d*$/.test(v)) {
              onChange("roomNumber", v);
            }
          }}
          placeholder="ex: 101"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NumberInput
          label="Nombre de lits"
          value={form.roomNumOfBed}
          onChange={(v) => {
            
            if (/^\d*$/.test(v)) {
              onChange("roomNumber", v);
            }
          }}
          placeholder="ex: 2"
          required
        />

        <NumberInput
          label="Étage"
          value={form.roomFloor}
          onChange={(v) => {
            if (/^\d*$/.test(v)) {
              onChange("roomFloor", v);
            }
          }}
          placeholder="ex: 1"
          required
        />
      </div>

      <TextArea
        label="Description (optionnel)"
        value={form.roomDescription}
        onChange={(v) => onChange("roomDescription", v)}
        placeholder="Courte description de la chambre..."
      />

      <TextInput
        label="URL de l'image (optionnel)"
        value={form.photo}
        onChange={(v) => onChange("photo", v)}
        placeholder="https://..."
      />

      <div className="flex items-center justify-end gap-3 pt-2">
        <Button type="button" variant="ghost" onClick={() => {
          setForm({
            roomType: "",
            roomDescription: "",
            photo: "",
            roomNumber: "",
            roomNumOfBed: "",
            roomFloor: "",
          });
          setErrorMsg(null);
          setSuccessMsg(null);
        }}>
          Réinitialiser
        </Button>

        <Button type="submit" disabled={loading}>
          {loading ? "Création..." : "Créer la chambre"}
        </Button>
      </div>
    </form>
  );
}
