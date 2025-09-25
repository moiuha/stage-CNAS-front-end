'use client';
import React from 'react';
import BookingForm from '@/app/src/app/components/bookingForm';

interface Props {
  roomId: number;
  userId?: number;
  userHasRoom: boolean;
}

export default function BookingFormWrapper({ roomId, userId, userHasRoom }: Props) {
  return (
    <div>
      {userHasRoom && (
        <div className="mb-4 max-w-full bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m0-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-yellow-800">Attention</div>
              <div className="text-sm text-yellow-700">
                Vous avez déjà une chambre associée à votre compte. En réservant cette chambre, votre réservation actuelle sera modifiée ou remplacée.
              </div>
            </div>
          </div>
        </div>
      )}

    
      <BookingForm roomId={roomId} userId={userId} />
    </div>
  );
}
