import { useRouter } from 'expo-router';
import { useContext, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useCalorieContext } from '../../context/caloriesContext';
import { useMealContext } from "../../context/MealContext";
import { UserDetailContext } from "../../context/UserDetailContext";
import { DashboardCard } from "../components/DashboardCard";
import { DaysMeal } from '../components/DaysMeal';
import GenerateRecipeCard from '../components/GenerateRecepie';
import { Header } from '../components/Header';
import { GradientBackground } from "../ui/GradientProvider";

const Home = () => {

  const { user } = useContext(UserDetailContext);
  const { meals, setMeals } = useMealContext();
  const {userCalories,setUserCalories} = useCalorieContext();
  const router = useRouter();

// console.log(user);
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
    console.log("Arrived");
    const fetcheduserCalories = await fetch('http://192.168.1.12:3000/getUserCalories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.email
      })
    })

    if (fetcheduserCalories.ok) {
      const data1 = await fetcheduserCalories.json();
      setUserCalories(()=> data1);
      
    } 
  }
// console.log(user);
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