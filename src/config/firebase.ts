import { initializeApp } from "firebase/app";
// @ts-ignore - getReactNativePersistence exists at runtime but isn't in firebase/auth's type defs (known Firebase SDK issue)
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDM0_fm2xtxPJDuAdPQ_mO-0g6aYKocrVY",
  authDomain: "quicklist-68917.firebaseapp.com",
  projectId: "quicklist-68917",
  storageBucket: "quicklist-68917.firebasestorage.app",
  messagingSenderId: "236205840270",
  appId: "1:236205840270:web:e3792f1db8aa58089876df"
};


const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});