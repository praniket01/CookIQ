import { Stack } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { MealProvider } from "../context/MealContext.jsx";
import { UserDetailContext } from "../context/UserDetailContext.jsx";

export default function RootLayout() {

  const [user,setUser] = useState();
  return(
    <UserDetailContext.Provider value={{user,setUser}}>
      <MealProvider>
      <Stack screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="index" />
    </Stack>
    </MealProvider>
    <Toast />
    </UserDetailContext.Provider>
    
  );
}
