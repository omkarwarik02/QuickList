import "../../global.css";
import { AuthProvider } from "../context/AuthContext";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Toast from "react-native-toast-message";
import { Stack } from "expo-router";
import * as Notifications from "expo-notifications";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  return (
  <AuthProvider>
     <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#F7F7F8" } }} />
     <Toast />
  </AuthProvider>
 
  );
}
