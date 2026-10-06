import { Text, View, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useEffect } from "react";
import { syncUser } from "@/utils/syncUser";
import { useAuth } from "@/context/AuthContext";
import { registerPushToken } from "@/utils/registerPushToken";

export default function LoginScreen() {
    const router = useRouter();
    const { markSigningIn } = useAuth();

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
    markSigningIn();
    const userCredential = await signInWithCredential(auth, credential);
    await syncUser();
    registerPushToken().catch((err)=> console.log("Push registration failed:", err));
    router.replace("/(app)/home");
    } catch (error){
        console.error("Google Sign-In error:", error);
    }
};

return (
    <SafeAreaView className="flex-1 bg-background items-center justify-center px-6">
      {/* icon.png has a white margin around the orange tile; oversize and clip it off (same as the onboarding slide) */}
      <View style={{ width: 96, height: 96, borderRadius: 20, overflow: "hidden", marginBottom: 24 }}>
        <Image source={require("../../../assets/images/icon.png")} style={{ width: 107, height: 107, margin: -5.5 }} resizeMode="contain" />
      </View>
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