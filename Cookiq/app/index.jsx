import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { onAuthStateChanged } from "firebase/auth";
import { useRef, useState } from 'react';
import { Animated, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from "../app/ui/GradientProvider";
import auth from "../services/FirebaseConfig";
import FeaturesComponent from './components/FeaturesComponent';
import { Navbar } from './components/Navbar';
import { Slideshow } from './components/SlideShow';
import { SplashScreen } from './splashScreen';

import { useContext, useEffect } from 'react';
import { UserDetailContext } from "../context/UserDetailContext";

const { height, width } = Dimensions.get('window');
const IMAGE_HEIGHT = height * 0.4;
const COLLAPSE_HEIGHT = height * 0.1;
const SCROLL_DISTANCE = IMAGE_HEIGHT * 0.8;

const HomePage = () => {

  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const { user, setUser } = useContext(UserDetailContext);

  useEffect(() => {

    let splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    const unSubscribe = onAuthStateChanged(auth, async (userInfo) => {
      console.log("auth",auth)
      if (!userInfo) {
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
        if (data && data?.userDetail) {
          setUser(data.userDetail);
          router.replace('/(tabs)/Home')
        }
        else {
          router.replace('/preferences')
        }

      }
    })
    return () => {
      clearTimeout(splashTimer);
      unSubscribe();
    };
  }, [])


  const scrollY = useRef(new Animated.Value(0)).current;

  const animatedImageHeight = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [IMAGE_HEIGHT, COLLAPSE_HEIGHT],
    extrapolate: 'clamp',
  });

  const animatedImageOpacity = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE / 2, SCROLL_DISTANCE],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  return (
    (showSplash) ? (< SplashScreen/>) :(
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <GradientBackground>
        <Navbar />
        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={5}
          contentContainerStyle={{ paddingBottom: 10, flexGrow: 1 }}
        >
          <LinearGradient
            colors={['transparent', 'rgba(13, 14, 18, 0.9)', '#0d0e12']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ flex: 1 }}
          />
          <Slideshow />
          <View style={{
            backgroundColor: '#0d0e12',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingHorizontal: 20,
            paddingVertical: 30,
            zIndex: 1,
            width: '100%',
          }}>
            <Text style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: '#d9d3e8',
              textAlign: 'center',
              marginBottom: 15,
              textShadowColor: 'rgba(0, 0, 0, 0.7)',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 3,
            }}>
              Welcome to Cookiq!
            </Text>
            <Text style={{
              fontSize: 16,
              color: '#E0E0E0',
              textAlign: 'center',
              lineHeight: 24,
              marginBottom: 40,
              opacity: 0.9,
            }}>
              CookIQ is your intelligent nutrition companion. We help you effortlessly track your calorie intake, understand your dietary needs, and generate delicious, personalized recipes tailored just for you. Say goodbye to guesswork and hello to smart eating!
            </Text>

            <FeaturesComponent scrollY={scrollY} />

            <TouchableOpacity onPress={() => { router.push("/auth/Signin") }} style={{
              width: '50%',
              maxWidth: 300,
              alignSelf: 'center',
              // marginTop: 40,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.7,
              shadowRadius: 15,
            }}>
              <LinearGradient
                colors={['#10b589', '#65ad99', '#75b4c7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  borderRadius: 15,
                  padding: 20,
                  flex: 1,
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{
                  color: '#fff',
                  fontSize: 22,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textShadowColor: 'rgba(0, 0, 0, 0.5)',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }}>
                  Get Started
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.ScrollView>
      </GradientBackground>
    </SafeAreaView>
  )
  );
};

export default HomePage;
