import { useState } from "react";
import { uploadPhoto } from "../utils/uploadPhoto";
import { API_BASE_URL } from "../config/api";
import { getAuthToken } from "../utils/getAuthToken";
import { showSuccessToast, showErrorToast } from "@/utils/toast";

export default function useListSubmit(){

const [submitting, setSubmitting] = useState(false);
const [submitError, setSubmitError] = useState<string | null>(null);
const [submitSuccess, setSubmitSuccess] = useState(false);


const submitListing = async (formData : {
    photos:string[];
    title:string;
    category:string;
    price:string;
    description:string;
    location:{name: string; latitude:number; longitude:number} | null;
}) => {
    setSubmitting(true);
    setSubmitError(null);

    try{
        const uploadurls = await Promise.all(
            formData.photos.map((uri) => uploadPhoto(uri))
        );

        const token = await getAuthToken();

        const response = await fetch(`${API_BASE_URL}/listings`,{
            method:"POST",
            headers:{
                Authorization:`Bearer ${token}`,
          "Content-Type": "application/json",
            },
            body:JSON.stringify({
                photos:uploadurls,
                title:formData.title,
                category:formData.category,
                price:Number(formData.price),
                description:formData.description,
                location:formData.location,
            }),
        });

        if(!response.ok){
            throw new Error("Failed to create listing");
        }

        showSuccessToast("Listing Posted!","Your item is now live.")
        setSubmitSuccess(true);
        return true;
    } catch(error){
        console.error(error);
         showErrorToast("Something went wrong", "Please try again.");
        setSubmitError("Something went wrong. Please try again.");
        return false;
    } finally{
       setSubmitting(false);
    }
}

return { submitting, submitError, submitSuccess, submitListing };
















    
}