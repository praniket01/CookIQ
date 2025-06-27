import { LinearGradient } from 'expo-linear-gradient';
import { useContext, useState } from 'react';
import { Dimensions, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useCalorieContext } from '../../context/caloriesContext';
import { useMealContext } from '../../context/MealContext';
import { UserDetailContext } from "../../context/UserDetailContext";
import { GradientBackground } from "../ui/GradientProvider";
const { width } = Dimensions.get('window');

const RecipeList = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { user } = useContext(UserDetailContext);
  const [modalVisible, setModalVisible] = useState(false);
  const { meals, addMeal } = useMealContext();
  const { userCalories } = useCalorieContext();


  const handleCardPress = (recipe) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  const addRecepieToPlan = async () => {
    try {
      console.log(userCalories);
      if (meals.length < 3 && (userCalories.data.caloriesIntook <= user.calories || userCalories.data.proteinsIntook <= user.proteins)) {

        const email = user.email;
        const res = await fetch('http://192.168.1.12:3000/addMealtoDaysPlan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            recepie: selectedRecipe
          })
        })

        const body = await res.json();
        if (body.ok) {
          Toast.show({
            type: "success",
            text1: "Meal Added",
            position: "bottom"
          })
          setModalVisible(false);
          for (let i = 0; i < recipes.length; i++) {
            if (recipes[i].title === selectedRecipe.title) {
              recipes.splice(i, 1);
              addMeal(selectedRecipe)
            }
          }
        }
      }
      else {
        if (meals.length >= 3) {
          Toast.show({
            type: "error",
            text1: "Meals Limit reached",
            text2: "You've already added 3 meals today",
            position: "bottom"
          })
        }
        else if (userCalories.data.caloriesIntook >= user.calories || userCalories.data.proteinsIntook >= user.proteins) {
          Toast.show({
            type: "error",
            text1: "Goals already achieved",
            text2: "You've already completed today's target!",
            position: "bottom"
          })
        }
        setModalVisible(false);
      }


    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View style={{
      padding: 20,
      width: width
    }}>
      {recipes?.length > 0 && recipes.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleCardPress(item)}
          style={{
            flexDirection: 'row',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: 10,
            padding: 10,
            marginBottom: 15,
            borderWidth: 1,
            height: 140,
            borderColor: 'rgba(255, 255, 255, 0.2)',
            alignItems: 'center',
          }}
        >
          <Image
            source={{ uri: item.imageLink }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 10,
              marginRight: 10,
            }}
            resizeMode="cover"
          />

          <View style={{ flex: 1 }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#FFD700',
              marginBottom: 5,
            }}>
              {item.title}
            </Text>
            <Text style={{
              color: '#E0E0E0',
              fontSize: 14,
            }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.ingredients}
            </Text>
          </View>
        </TouchableOpacity>
      ))}


      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <GradientBackground>
          <ScrollView contentContainerStyle={{ padding: 20, minHeight: Dimensions.get('window').height }}>
            {selectedRecipe && (
              <>
                {/* Modal Image */}
                <Image
                  source={{ uri: selectedRecipe.imageLink }}
                  style={{
                    width: '100%',
                    height: 250,
                    borderRadius: 15,
                    marginBottom: 20,
                  }}
                  resizeMode="cover"
                />

                {/* Modal Title */}
                <Text style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: '#FFD700',
                  marginBottom: 10,
                }}>
                  {selectedRecipe.title}
                </Text>

                <Text style={{ color: '#E0E0E0', fontSize: 16, marginBottom: 5 }}>
                  🔥 Calories: {selectedRecipe.calories}
                </Text>
                <Text style={{ color: '#E0E0E0', fontSize: 16, marginBottom: 15 }}>
                  🥩 Proteins: {selectedRecipe.proteins}
                </Text>

                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#b0ebdd', marginBottom: 5 }}>
                  Ingredients:
                </Text>
                <Text style={{ color: '#E0E0E0', fontSize: 16, marginBottom: 15 }}>
                  {selectedRecipe.ingredients}
                </Text>

                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#b0ebdd', marginBottom: 5 }}>
                  Instructions:
                </Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#b0ebdd', marginBottom: 5 }}>
                  {selectedRecipe.recipeInstructions.split(/\n|(?=\d+\.\s)/).map((step, index) => (
                    <Text
                      key={index}
                      style={{
                        color: '#E0E0E0',
                        fontSize: 16,
                        lineHeight: 24,
                        marginBottom: 8,
                      }}
                    >
                      {step.trim()}
                    </Text>
                  ))}
                </Text>
                <LinearGradient
                  colors={['#ff0011', '#c42d55', '#b52465']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    marginTop: 30,
                    borderRadius: 10,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      padding: 15,
                      borderRadius: 10,
                      alignItems: 'center',
                    }}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={{
                      color: '#fff',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                      Close
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
                <LinearGradient
                  colors={['#10b589', '#65ad99', '#75b4c7']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    marginTop: 30,
                    borderRadius: 10,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      padding: 15,
                      borderRadius: 10,
                      alignItems: 'center',
                    }}
                    onPress={addRecepieToPlan}
                  >

                    <Text style={{
                      color: '#fff',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                      ✔ Add meal to today's plan
                    </Text>

                  </TouchableOpacity>
                </LinearGradient>
              </>
            )}
          </ScrollView>
        </GradientBackground>
      </Modal>
    </View>
  );
};

export default RecipeList;
