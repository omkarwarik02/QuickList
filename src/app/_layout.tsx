import "../../global.css";
import { AuthProvider } from "../context/AuthContext";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  <AuthProvider>
     <Stack screenOptions={{ headerShown: false}} />
  </AuthProvider>
 
  );
}
