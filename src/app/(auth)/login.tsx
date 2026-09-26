import { Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useEffect } from "react";
import { syncUser } from "@/utils/syncUser";


export default function LoginScreen() {
    const router = useRouter();

useEffect(() => {
  GoogleSignin.configure({
    webClientId: "236205840270-2t7ot6frvu8v2kllu1ctospv4k4n4hml.apps.googleusercontent.com",
  });
}, []);;

const handleGoogleSignIn = async () => {
    try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    const idToken = userInfo.data?.idToken;
    if (!idToken) throw new Error("No ID token returned");

    const credential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(auth, credential);
    await syncUser();
    console.log("Signed in:", userCredential.user.email);
    router.replace("/(app)/listings");
    } catch (error){
        console.error("Google Sign-In error:", error);
    }
};

return (
    <SafeAreaView className="flex-1 bg-background items-center justify-center px-6">
      <Text className="text-2xl font-bold text-primary mb-2">Welcome to QuickList</Text>
      <Text className="text-gray-500 text-center mb-6">
        Sign in to start buying and selling nearby.
      </Text>

      <Pressable
        className="h-[52px] w-full bg-[#CC4900] rounded-full items-center justify-center"
        onPress={handleGoogleSignIn}
      >
        <Text className="text-white font-semibold text-base">Continue with Google</Text>
      </Pressable>
    </SafeAreaView>
)
    
}