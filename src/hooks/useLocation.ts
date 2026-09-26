import { useState } from "react";

import * as Location from "expo-location";



export function useLocation(){

  const [location, setLocation] = useState<{
        name:string;
        latitude:number;
        longitude:number;
    } | null>(null);
    const [locationLoading, setLocationLoading] = useState(false);







 const detectLocation = async () => {
        setLocationLoading(true);
        try{
            const { status} = await Location.requestForegroundPermissionsAsync();
            if(status !== "granted"){
                setLocationLoading(false);
                return;
            }

            const position = await Location.getCurrentPositionAsync({});
            const [place] = await Location.reverseGeocodeAsync({
                latitude: position.coords.latitude,
                longitude:position.coords.longitude,
            });

            const name = place?.district || place?.city || place?.subregion || "Unknown Area"

            setLocation({
                name,
                latitude: position.coords.latitude,
                 longitude: position.coords.longitude,
            });

        } catch (error){
             console.error("Location detection error:", error);
        } finally {
            setLocationLoading(false);
        }
    }

    return { location, locationLoading, detectLocation };
}