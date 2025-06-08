import { LinearGradient } from 'expo-linear-gradient'; // Ensure expo-linear-gradient is installed
import { useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RecipeList from '../components/RecipeList';

const { width } = Dimensions.get('window');


const GenerateRecipeScreen = () => {
  const [recipePrompt, setRecipePrompt] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nebiusImageUrl, setNebiusImageUrl] = useState([]);

  const suggestionCategories = [
    'Breakfast', 'Lunch', 'Dinner', 'Snacks',
    'Low Carb', 'High Protein', 'Vegan', 'Vegetarian',
    'Quick Meals', 'Healthy Desserts', 'Meal Prep', 'Budget-Friendly'
  ];

  const handleSuggestionPress = (suggestion) => {

    setRecipePrompt(prevPrompt =>
      prevPrompt ? `${prevPrompt}, ${suggestion}` : suggestion
    );
  };

  const handleSubmit = async () => {
    if (!recipePrompt.trim()) {
      Alert.alert('Empty Prompt', 'Please enter some details for the recipe.');
      return;
    }

    setLoading(true);
    setGeneratedRecipe([]);

    try {
      const response = await fetch('http://192.168.1.12:3001/generaterecepie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: recipePrompt,
        }),
      });

      const data = await response.json();
      setGeneratedRecipe(data);
      const recepieTitleArray = new Array();
      for (var i = 0; i < 3; i++) {
        recepieTitleArray.push(data.recipe[i].title);
      }

      const imageGenerated = await fetch('http://192.168.1.12:3001/generateImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: recepieTitleArray,
        }),
      });

      const result = await imageGenerated.json();
      setNebiusImageUrl(result.generatedIMG);

      const recipes = generatedRecipe.recipe;



    } catch (error) {
      console.error('Network or unexpected error during recipe generation:', error);
      Alert.alert('Network Error', 'Could not connect to the backend. Is your server running?');
    } finally {
      setLoading(false);
      setRecipePrompt('');
    }
  };

  return (
    <LinearGradient
      colors={['#0f1538', '#131624', '#0d0e12']} // Dark gradient background
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, paddingHorizontal: 20, paddingTop: 60 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingBottom: 40 }}>
        {/* Title */}
        <Text style={{
          fontSize: 28,
          fontWeight: 'bold',
          marginTop: 20,
          color: '#d9d3e8', 
          textAlign: 'center',
          marginBottom: 30,
          textShadowColor: 'rgba(0, 0, 0, 0.7)',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 3,
        }}>
          Generate Recipe with AI
        </Text>

        {/* Input Textbox */}
        <TextInput
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: 15,
            borderRadius: 15,
            color: '#fff',
            fontSize: 16,
            width: '100%',
            marginBottom: 20,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.3)',
            height: 120, 
            textAlignVertical: 'top',
          }}
          placeholder="e.g., 'A quick vegetarian dinner with broccoli and pasta' or 'High protein snack for after workout'"
          placeholderTextColor="#8c869c"
          multiline={true}
          value={recipePrompt}
          onChangeText={setRecipePrompt}
        />

       
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          marginBottom: 30,
          width: '100%',
        }}>
          {suggestionCategories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)', 
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 20, 
                margin: 5, 
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.3)',
              }}
              onPress={() => handleSuggestionPress(category)}
            >
              <Text style={{
                color: '#E0E0E0',
                fontSize: 14,
                fontWeight: 'bold',
              }}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#08b6d1',
            padding: 18,
            borderRadius: 15,
            marginBottom: 20,
            width: '80%',
            alignItems: 'center',
            shadowColor: '#FF6347',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.7,
            shadowRadius: 15,
            elevation: 20,
          }}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: 'bold',
              textShadowColor: 'rgba(0, 0, 0, 0.5)',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 2,
            }}>
              Submit Request
            </Text>
          )}
        </TouchableOpacity>

        {generatedRecipe.recipe?.length > 0 && (
          <RecipeList recipes={generatedRecipe.recipe.map((recipe, index) => ({
            ...recipe,
            imageLink: nebiusImageUrl[index] || "",
          }))} />
        )}

      </ScrollView>
    </LinearGradient>
  );
};

export default GenerateRecipeScreen;
