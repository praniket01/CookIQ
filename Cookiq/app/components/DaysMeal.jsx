import { LinearGradient } from 'expo-linear-gradient';
import { useContext, useState } from 'react';
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useMealContext } from '../../context/MealContext';
import { UserDetailContext } from '../../context/UserDetailContext';
import { useCalorieContext } from '../../context/caloriesContext';
import { GradientHeading } from './GradientHeading';


const DaysMeal = ({ mealList }) => {

  const [selectedMeal, setSelectedMeal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useContext(UserDetailContext);
  const { meals, setMeals } = useMealContext();
  const { userCalories } = useCalorieContext();

  const handleCardPress = (meal) => {
    setSelectedMeal(meal);
    setModalVisible(true);
  };


  const markMealAsComplete = async () => {
    const email = user.email;
    let cal = selectedMeal.calories.split(" ");
    let prot = selectedMeal.proteins.split(" ");

    const calories = parseInt(cal[0]);
    const proteins = parseInt(prot[0]);
    const res = await fetch('http://192.168.1.12:3000/markAsComplete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        title: selectedMeal.title,
        calories: calories,
        proteins: proteins
      })
    }
    );

    const data = await res.json();
    if (data.ok) {
      userCalories.data.caloriesIntook += calories;
      userCalories.data.proteinsIntook += proteins;
      setModalVisible(false);
      setMeals(meals.filter(meal => {
        return meal.title !== selectedMeal.title;
      }));
      Toast.show({
        type: "success",
        text1: "Meal Eaten",
        position: "bottom"
      })

    }


  };
  const removeMeal = async () => {
    const email = user.email;
    const res = await fetch('http://192.168.1.12:3000/markAsComplete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        title: selectedMeal.title
      })
    }
    );

    const data = await res.json();
    setMeals((prevMeals) => prevMeals.filter(m => m.title !== selectedMeal.title));

    setModalVisible(false);
    Toast.show({
      type: "success",
      text1: "Meal Removed",
      position: "bottom"
    })


  };


  if (!mealList || mealList.length === 0) {
    return (

      <View
        style={{
          padding: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <GradientHeading />
        {/* <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            color: '#999',
          }}
        >
          No meals for today!
        </Text> */}
        <Image
          source={require('../../assets/images/No-data.jpg')}
          contentFit="cover"
          style={{
            height: 400,
            width: 400,
            // marginBottom: 150
          }}
        />
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 5, marginBottom: 70 }}>

      <GradientHeading />
      {mealList.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          onPress={() => {
            handleCardPress(item)
          }}
          style={{
            borderRadius: 30,
            marginBottom: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            marginBottom: 15,
            // elevation: 3,
            overflow: 'hidden'
          }}
        >
          <LinearGradient
            colors={['#ced4f5', '#6cc4f0', '#6771ab']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={{
              padding: 20,
              borderRadius: 20,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000203' }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 14, color: '#051b26', marginTop: 4 }}>
              Calories: {item.calories}
            </Text>
            <Text style={{ fontSize: 14, color: '#051b26' }}>
              Proteins: {item.proteins}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.6)',
            padding: 20,
          }}
        >
          <LinearGradient
            colors={['#c8f7f7', '#dff5f5', '#f0fafa']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={{
              padding: 20,
              borderRadius: 20,
            }}
          >
            <View
              style={{
                // backgroundColor: 'white',
                borderRadius: 10,
                padding: 20,
                // shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                // shadowOpacity: 0.3,
                shadowRadius: 4,
                // elevation: 5,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
                {selectedMeal?.title}
              </Text>
              <Text style={{ fontSize: 16, marginBottom: 5 }}>
                <Text style={{ fontWeight: 'bold' }} >Calories:</Text> {selectedMeal?.calories}
              </Text>
              <Text style={{ fontSize: 16, marginBottom: 5 }}>
                <Text style={{ fontWeight: 'bold' }} >Proteins:</Text> {selectedMeal?.proteins}
              </Text>
              <Text style={{ fontSize: 16, marginBottom: 5 }}>
                <Text style={{ fontWeight: 'bold' }} >Ingredients:</Text> {selectedMeal?.ingredients}
              </Text>
              <Text style={{ fontSize: 16, marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold' }} >Instructions:</Text> {selectedMeal?.recipeInstructions || "No instructions provided."}
              </Text>

              <TouchableOpacity
                onPress={removeMeal}
                style={{
                  backgroundColor: '#fa7b57',
                  padding: 12,
                  borderRadius: 8,
                  alignItems: 'center',
                  marginTop: 10,
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Remove meal from Meal List</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={markMealAsComplete}
                style={{
                  backgroundColor: '#10b589',
                  padding: 12,
                  borderRadius: 8,
                  alignItems: 'center',
                  marginTop: 10,
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Mark meal as Completed</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  marginTop: 10,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#999', fontSize: 14 }}>Close</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </Modal>
    </ScrollView>
  );
};

export { DaysMeal };

