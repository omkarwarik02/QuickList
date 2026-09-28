import { useState, useCallback } from "react";
import { API_BASE_URL } from "../config/api";
import { getAuthToken } from "../utils/getAuthToken";

export type Listing = {
  _id: string;
  seller: string;
  photos: string[];
  title: string;
  category: string;
  price: number;
  phoneNumber: number;
  description: string;
  location: { name: string; latitude: number; longitude: number };
  status: "active" | "completed";
  createdAt: string;
}

async function requestAllListings(): Promise<Listing[]> {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/listings`,{
      headers:{Authorization: `Bearer ${token}`},
    });
    if(!response.ok) throw new Error("Failed to fetch listings");

    const data = await response.json();
    return data.listings ?? [];
}

export function useAllListing(){
const [listings, setListing] = useState<Listing[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);



const fetch = useCallback(async () =>{
  setLoading(true);
  setError(null);
  try{
    const data = await requestAllListings();
    setListing(data);

  } catch(error){
      console.error("Fetch all listings error:", error);
      setError("Failed to load listings")
  } finally{
    setLoading(false);
  }
},[])


return { listings, loading, error, fetch};






















}