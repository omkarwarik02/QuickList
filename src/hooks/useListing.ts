import { useState, useCallback } from "react";
import { API_BASE_URL } from "../config/api";
import { getAuthToken } from "../utils/getAuthToken";
import { Listing } from "./useAllListings";

async function requestListing(id:string): Promise<Listing>{
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/listings/${id}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    if(!response.ok){
        throw new Error("Failed to fetch listing")
    }
    const data = await response.json();
    return data.listing;
}

export function useListing(id:string){
    const [listing, setListing] = useState<Listing | null>(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);



    const fetch = useCallback(async () =>{
        if(!id) return;
        setLoading(true);
        setError(null);

        try{
            const data = await requestListing(id);
            setListing(data);
        } catch(error) {
             console.error("Fetch listing error:", error);
      setError("Failed to load listing");
        } finally {
            setLoading(false);
        }

    },[id])

    return {listing, loading, error, fetch};
}