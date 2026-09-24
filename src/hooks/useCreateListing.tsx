import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { categories } from "@/constants/categories";
import * as Location from "expo-location";

const MAX_PHOTOS = 5;

export function useCreateListing() {
    const [photos, setPhotos] = useState<string[]>([]);
    const [title, setTitle] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState<{
        name:string;
        latitude:number;
        longitude:number;
    } | null>(null);
    const [locationLoading, setLocationLoading] = useState(false);


    const pickImages = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsMultipleSelection: true,
            selectionLimit: MAX_PHOTOS - photos.length,
            quality: 0.7,
        });

        if (!result.canceled) {
            const newUris = result.assets.map((asset) => asset.uri);
            setPhotos((prev) => [...prev, ...newUris].slice(0, MAX_PHOTOS));
        }
    };

    const removePhoto = (uriToRemove: string) => {
        setPhotos((prev) => prev.filter((uri) => uri !== uriToRemove));
    };

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

    return { photos, pickImages, removePhoto, maxPhotos: MAX_PHOTOS, title, setTitle, selectedCategory, setSelectedCategory, setPrice,price, description,setDescription, location, locationLoading, detectLocation };


}
