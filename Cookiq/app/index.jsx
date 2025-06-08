import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import Button from "../components/shared/Button";
import { UserDetailContext } from "../context/UserDetailContext";
import "../global.css";
import auth from "../services/FirebaseConfig";
import colors from "../shared/colors";

export default function Index() {

  const router = useRouter();
  const { user, setUser } = useContext(UserDetailContext);

  useEffect(() => {
   
    const unSubscribe = onAuthStateChanged(auth, async (userInfo) => {

      if(!userInfo)
      {
        return;
      }

      const res = await fetch('http://192.168.1.12:3000/getuserdetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userInfo?.email
        })
      })
      if (res.ok) {
        const data = await res.json();
        if(data && data.userDetail){
        setUser(data.userDetail);
        router.replace('/(tabs)/Home');
        }
        else{
          router.replace('/preferences');
        }

      }
    })
    return () => unSubscribe();
  }, [])

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Image source={require('../assets/images/homepage2.png')}
        style={
          {
            width: '100%',
            height: Dimensions.get('screen').height,
            opacity: 0.8
          }
        }
      />
      <View style={
        {
          position: "absolute",
          height: Dimensions.get("screen").height,
          backgroundColor: "#0707075e",
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: 15
        }
      }>
        <Image source={require("../assets/images/logo.png")}
          style={{
            width: 100,
            height: 100,
            marginTop: 100,

          }}
        />
        <Text
          style={
            {
              fontSize: 30,
              fontWeight: "bold",
              color: colors.WHITE
            }
          }
        >
          COOKIQ
        </Text>
        <Text
          style={
            {
              textAlign: "center",
              marginHorizontal: 20,
              fontSize: 20,
              fontStyle: "italic",
              fontFamily: "serif",
              color: colors.WHITE,
              marginTop: 300,
              fontWeight: "bold",
              opacity: 0.8
            }
          }
        >
          Smarter eating starts with intelligent planning. AI-powered nutrition, tailored for you.
        </Text>
        <View style={{
          position: "absolute",
          width: "100%",
          bottom: 30,
          marginBottom: 20,
          padding: 20
        }}>
          <Button
            backgroundColor="#7314d9"
            onPress={() => { router.push("/auth/Signin") }} title={"Get Started"} />
        </View>
      </View>
    </View>
  );
}
