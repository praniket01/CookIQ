
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app"; // Import FirebaseOptions and FirebaseApp types
import {
  Auth,
  getAuth,
  getReactNativePersistence,
  initializeAuth, // Import Auth type
  Persistence, // Import Persistence type
} from "firebase/auth";
import { Platform } from "react-native";

// Define the type for your firebaseConfig object for better type checking
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
console.log("Firebase App initialized:", app.name); // Log to confirm app initialization


let authInstance: Auth;

if (Platform.OS === 'web') {
  authInstance = getAuth(app);
  console.log("Firebase Auth initialized for web:", authInstance);
} else {
  
  try {
    // Ensure getReactNativePersistence is correctly typed to return Persistence
    authInstance = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage as unknown as Persistence)
    });
    console.log("Firebase Auth initialized for React Native:", authInstance);
  } catch (e: unknown) { // Use 'unknown' for catch block error and then narrow its type
    console.error("Error initializing Firebase Auth for React Native:", e);
   
    authInstance = getAuth(app);
    console.log("Falling back to getAuth for React Native:", authInstance);
  }
}

export const auth: Auth = authInstance; // Export as 'auth' with Auth type
export default auth; // Also export as default for convenience
