"use server";
import { cancelBooking, CancelBookingRequest } from "../../services/room";


export async function cancelBookingAction(data: CancelBookingRequest) {
  try {
    return await cancelBooking(data);
  } catch (error) {
    return { error: error.message || "Erreur lors de l'annulation" };
  }
}