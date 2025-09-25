'use client';

import React, { useState } from 'react';

export default function ChangeImageButton({ roomId }: { roomId: number }) {
  const [status, setStatus] = useState<string>('');

  const handleClick = () => {
    if (typeof window === 'undefined') return;
    const value = prompt('Enter roomImage as a string:');
    if (value === null) {
      setStatus('Canceled');
      return;
    }
    localStorage.setItem(`roomImage_${roomId}`, value);
    
  };

  return (
    <div className="inline-flex items-center">
      <button
        onClick={handleClick}
        className="px-5 py-2 rounded-lg bg-yellow-500 text-white font-semibold shadow hover:bg-yellow-600 border border-yellow-500 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
        type="button"
      >
        Changer l'image
      </button>
      <span className="ml-3 text-sm">{status}</span>
    </div>
  );
}
