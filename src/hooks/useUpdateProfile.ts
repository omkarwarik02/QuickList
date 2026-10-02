// utils/updateProfile.ts (or wherever checkUser lives)
import { getAuthToken } from "../utils/getAuthToken"; // adjust to your actual import
import { API_BASE_URL } from "@/config/api";

export async function updateProfile(phone: string, location: string) {
  const token = await getAuthToken();

  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone, location }),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  const data = await response.json();
  return data.user;
}