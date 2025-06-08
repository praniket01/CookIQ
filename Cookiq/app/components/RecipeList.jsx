import { useState } from 'react';
import { Dimensions, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
const { width } = Dimensions.get('window');

const RecipeList = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCardPress = (recipe) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

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
        <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: '#0f1538', minHeight: Dimensions.get('window').height }}>
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
              <TouchableOpacity
                style={{
                  marginTop: 30,
                  backgroundColor: '#1bc432',
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
            </>
          )}
        </ScrollView>
      </Modal>
    </View>
  );
};

export default RecipeList;
