import { useState } from "react";
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
        await new Promise((resolve) => setTimeout(resolve,1500));
        console.log("Listing submitted:", formData);
        showSuccessToast("Listing Posted!","Your item is now live.")
        setSubmitSuccess(true);
        return true;
    } catch(error){
         showErrorToast("Something went wrong", "Please try again.");
        setSubmitError("Something went wrong. Please try again.");
        return false;
    } finally{
       setSubmitting(false);
    }
}

return { submitting, submitError, submitSuccess, submitListing };
















    
}