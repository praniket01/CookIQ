import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Dimensions, Text, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

const GenerateRecipeCard = ({ onPressGenerate }) => {
    const router = useRouter();
  
const generaterecepie = () => {
    router.push('../generaterecepie')
}

    return (
    <LinearGradient
      colors={[
        '#2a3a5b', 
        '#1a2a4b', 
        '#0f1538', 
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)', 
      borderRadius: 20,
      padding: 20,
      marginVertical: 15, 
      width: width * 0.9, 
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
    //   elevation: 15,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      }}
    >
    
      {/* Card Title */}
      <Text style={{
        fontSize: 22,
        fontWeight: 'bold',
        color: '#d9d3e8', 
        marginBottom: 10,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
      }}>
        Generate Personalized Recipes
      </Text>

      <Text style={{
        fontSize: 16,
        color: '#E0E0E0',
        textAlign: 'center',
        marginBottom: 25, 
        opacity: 0.8,
      }}>
        Craft meals perfectly suited to your taste and dietary needs.
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#18c769', 
          padding: 15,
          borderRadius: 12,
          width: '80%', // Responsive width for the button
          alignItems: 'center',
          shadowColor: '#02f573',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.7,
          shadowRadius: 10,
          elevation: 12,
        }}
        onPress={generaterecepie}
      >
        <Text style={{
          color: '#fff',
          fontSize: 18,
          fontWeight: 'bold',
          textShadowColor: 'rgba(0, 0, 0, 0.5)',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 2,
        }}>
          Generate with AI
        </Text>
      </TouchableOpacity>
    {/* </View> */}
    </LinearGradient>
  );
};

export default GenerateRecipeCard;
