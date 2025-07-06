
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import {
  Auth,
  getAuth,
  getReactNativePersistence,
  initializeAuth,
  Persistence,
} from "firebase/auth";
import { Platform } from "react-native";


const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_APIKEY,
  authDomain: "test-proj-daeb8.firebaseapp.com",
  projectId: "test-proj-daeb8",
  storageBucket: "test-proj-daeb8.firebasestorage.app",
  messagingSenderId: "874566282043",
  appId: "1:874566282043:web:758edf085628f7d988251e",
  measurementId: "G-BEZLG7RE0Q"
};
export const app: FirebaseApp = initializeApp(firebaseConfig);
console.log("Firebase App initialized:", app.name);


let authInstance: Auth;

if (Platform.OS === 'web') {
  authInstance = getAuth(app);
  console.log("Firebase Auth initialized for web:", authInstance);
} else {
  
  try {
    
    authInstance = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage as unknown as Persistence)
    });
    console.log("Firebase Auth initialized for React Native:", authInstance);
  } catch (e: unknown) {
    console.error("Error initializing Firebase Auth for React Native:", e);
    authInstance = getAuth(app);
    console.log("Falling back to getAuth for React Native:", authInstance);
  }
}

export const auth: Auth = authInstance;
export default auth; 
