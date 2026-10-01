import { useState, useCallback } from "react";
import * as Location from "expo-location";
import{ API_BASE_URL } from "../config/api"
import { getAuth } from "firebase/auth";

export function useNearByListing() {
    const [listings, setListing] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);





    const fetch = useCallback(async(radiusKm : number = 5)=>{
        setLoading(true);
        setError(null);

        try{
            const { status } = await Location.requestForegroundPermissionsAsync();
            if( status !== "granted"){
                setError("Location permission denied");
                setLoading(false);
                return false;
            }

            const loc = await Location.getCurrentPositionAsync({});
              const token = await getAuth().currentUser?.getIdToken();
            const res = await globalThis.fetch(`${API_BASE_URL}/listings/nearby?lat=${loc.coords.latitude}&lng=${loc.coords.longitude}&radius={radiusKm}`,{
                headers:{
                    Authorization:`Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
        )
        if(!res.ok) throw new Error("Failed to fetch nearby listings");

        const data = await res.json()
        setListing(data.listings);
        return true;

        } catch(err){
            console.error("Fetch nearby listings error:", err);
      setError("Failed to fetch nearby listings");
      return false;
        } finally {
            setLoading(false);
        }

    }, []);

     return { listings, loading, error, fetch };
}