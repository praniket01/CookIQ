import { useRouter } from 'expo-router';
import { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { UserDetailContext } from "../../context/UserDetailContext";
import { DashboardCard } from "../components/DashboardCard";
import GenerateRecipeCard from '../components/GenerateRecepie';
import { Header } from "../components/Header";
import { GradientBackground } from "../ui/GradientProvider";


const Home = () => {

  const { user } = useContext(UserDetailContext);
  const router = useRouter();
  useEffect(() => {
    if (!user.weight) {
      router.replace('/preference')
    }
  }, [])

  return (
    <GradientBackground>
      <View
        style={{
          flex: 1,
          paddingTop: 60,
          paddingHorizontal: 20,
        }}
      >
        <Header />
        <View style={{ flex: 1 }}>
        <DashboardCard />
        <GenerateRecipeCard />
        </View>
      </View>
    </GradientBackground>

  )
}

export default Home