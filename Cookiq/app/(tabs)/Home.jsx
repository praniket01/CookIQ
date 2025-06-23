import { useRouter } from 'expo-router';
import { useContext, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useMealContext } from "../../context/MealContext";
import { UserDetailContext } from "../../context/UserDetailContext";
import { DashboardCard } from "../components/DashboardCard";
import { DaysMeal } from '../components/DaysMeal';
import GenerateRecipeCard from '../components/GenerateRecepie';
import { Header } from "../components/Header";
import { GradientBackground } from "../ui/GradientProvider";

const Home = () => {

  const { user } = useContext(UserDetailContext);
  const { meals,setMeals } = useMealContext();
  const router = useRouter();


  useEffect(() => {
    if (!user.weight) {
      router.replace('/preference')
    }

    onPageRefresh();
  }, [])

  const onPageRefresh = async () => {
    const email = user.email;
    const res = await fetch('http://192.168.1.12:3000/getDataOnRefresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email
      })
    })
    const data = await res.json();
    setMeals(data.recepies.recepies);
  }


  console.log("meals.count", meals.length);
  return (
    <GradientBackground>
      <ScrollView
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
          <DaysMeal mealList={meals} />
        </View>
      </ScrollView>
    </GradientBackground>

  )
}

export default Home