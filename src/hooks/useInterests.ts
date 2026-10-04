import { useState, useCallback } from "react";
import { getInterestedListings } from "@/utils/getInterests";
import { Listing } from "./useAllListings";

export function useInterests(){
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);




    const fetch = useCallback(async()=>{
        setLoading(true);
        setError(null);
        try{
            const data = await getInterestedListings();
            setListings(data);

        } catch(error){
            console.error("Failed to load interests:", error);
            setError("Failed to load interests")

        }finally{
            setLoading(false);
        }
    },[])




    return {loading, listings, error, refetch: fetch};


}