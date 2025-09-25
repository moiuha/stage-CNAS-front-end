'use client';

import React, { useState, useEffect } from "react";

interface EditableLabelProps {
  label: string;
  value: string | number;
  roomId: number;
  field: string;
  onChange?: (field: string, value: string | number) => void;
}

export default function EditableLabel({ label, value, roomId, field, onChange }: EditableLabelProps) {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState<string | number>(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleBlur = () => {
    setEditing(false);
    if (inputValue !== value) {
      onChange?.(field, inputValue);
      try {
        const key = `room_local_${roomId}`;
        const existing = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
        const obj = existing ? JSON.parse(existing) : {};
        obj[field] = inputValue;
        localStorage.setItem(key, JSON.stringify(obj));
      } catch (e) {}
    }
  };

  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="inline-block bg-blue-50 text-blue-800 font-semibold px-4 py-2 rounded-lg shadow border border-blue-200 min-w-[120px] text-sm">
        {label} :
      </span>
      {editing ? (
        <input
          className="border border-blue-300 rounded-lg px-3 py-2 text-sm shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={String(inputValue)}
          onChange={e => setInputValue(e.target.value)}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span
          className="text-gray-900 font-medium bg-white px-4 py-2 rounded-lg shadow cursor-pointer hover:bg-blue-50 hover:shadow-lg transition border border-gray-200"
          onClick={() => setEditing(true)}
        >
          {value}
        </span>
      )}
    </div>
  );
}
