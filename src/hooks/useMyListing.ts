import { useState, useEffect, useCallback } from "react";
import { API_BASE_URL } from "../config/api";
import { getAuthToken } from "../utils/getAuthToken";
import { showErrorToast } from "@/utils/toast";

export interface Listing {
  _id: string;
  photos: string[];
  title: string;
  category: string;
  price: number;
  description: string;
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
  status: "active" | "completed";
  createdAt: string;
}

async function requestMyListings(): Promise<Listing[]> {
  const token = await getAuthToken();
  const response = await fetch(`${API_BASE_URL}/listings/self-listing`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch listings");
  // Backend responds with { listings: [...] }
  const data = await response.json();
  return data.listings ?? [];
}

export function useMyListing() {
  const [listing, setListing] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State is only set in the promise callbacks, never synchronously in the effect
  const loadListings = useCallback(() => {
    return requestMyListings()
      .then((data) => {
        setListing(data);
        setError(null);
      })
      .catch((error) => {
        console.error("Fetch listings error:", error);
        setError("Something went wrong. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(()=>{
    loadListings();
  },[loadListings]);

  const fetchListings = useCallback(async () => {
    setLoading(true);
    setError(null);
    await loadListings();
  }, [loadListings]);

  const removeListing = async (id:string) => {
    try {
      const token = await getAuthToken();
      const response = await fetch(`${API_BASE_URL}/listings/${id}`,{
          method:"DELETE",
          headers:{Authorization:`Bearer ${token}`},
      });
      if (!response.ok) throw new Error("Failed to delete listing");
      // Only drop it from the list once the server has actually deleted it
      setListing((prev)=> prev.filter((list)=> list._id !== id));
      return true;
    } catch (error) {
      console.error("Delete listing error:", error);
      showErrorToast("Couldn't delete listing", "Please try again.");
      return false;
    }
  };

  return {listing, loading, error, refetch: fetchListings, removeListing};






}
