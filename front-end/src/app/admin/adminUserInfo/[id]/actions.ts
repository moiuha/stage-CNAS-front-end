"use server";
import { deleteUser } from "../../../services/user";

export async function deleteUserAction(userId: string) {
  return await deleteUser(userId);
}