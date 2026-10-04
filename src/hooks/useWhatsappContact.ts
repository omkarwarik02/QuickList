import { useCallback } from "react";
import { Linking, Alert } from "react-native";
import { addInterest } from "@/utils/addInterest";

export function useWhatsAppContact(){
    const contactSeller = useCallback((listingId:string,phoneNumber:string,listingTitle:string)=>{
        if(!phoneNumber){
            Alert.alert("No contact number", "This listing has no phone number on file.");
      return;
        }
        
        addInterest(listingId).catch((err)=>{
            console.error("Failed to save interest:", err)
        });

        const cleanNumber = "91" + phoneNumber.replace(/\D/g, "").slice(-10);

        const message = `Hi I'm interested in your listing "${listingTitle}" on QuickList.`;
        const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

        Linking.openURL(url).catch(()=>{
               Alert.alert("Couldn't open WhatsApp", "Make sure WhatsApp is installed.");
        })

    },[]);
    return { contactSeller };
}

