import { useState } from "react";
import { useRouter } from "expo-router";
import { slides } from "../constants/onboardingSlides";

export function useOnboarding() {
    const [step, setStep] = useState(0);
    const router = useRouter();

    const isLastSlide = step === slides.length - 1;
    const current = slides[step];


    const handleNext = () => {
        if(isLastSlide){
            router.push("/(auth)/login");
        } else {
            setStep((prev) => prev + 1);
        }
    };
     return { step, slides, current, isLastSlide, handleNext };
}
