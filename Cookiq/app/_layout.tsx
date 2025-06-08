import { Stack } from "expo-router";
import { useState } from "react";
import { UserDetailContext } from "../context/UserDetailContext.jsx";

export default function RootLayout() {

  const [user,setUser] = useState();
  return(
    <UserDetailContext.Provider value={{user,setUser}}>
      <Stack screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="index" />
    </Stack>
    </UserDetailContext.Provider>
    
  );
}
