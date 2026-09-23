import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { categories } from "@/constants/categories";

const MAX_PHOTOS = 5;

export function useCreateListing() {
    const [photos, setPhotos] = useState<string[]>([]);
    const [title, setTitle] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
    const [price, setPrice] = useState("");
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

    return { photos, pickImages, removePhoto, maxPhotos: MAX_PHOTOS, title, setTitle, selectedCategory, setSelectedCategory, setPrice,price };


}
