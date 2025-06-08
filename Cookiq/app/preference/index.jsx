import { Female02Icon, Male02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { Alert, Dimensions, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { UserDetailContext } from '../../context/UserDetailContext';

const { width } = Dimensions.get('window');

const ProfileSetupScreen = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

  const router = useRouter();
  const { user, setUser } = useContext(UserDetailContext);

  const goals = ['Muscle Gain', 'Cutting', 'Bulking'];
  const genders = ['Male', 'Female'];



  const onCreateProfile = async () => {
    let calculatedCalories = '';
    let calculatedProteins = '';

    if (!height || !weight || !selectedGoal || !selectedGender) {
      Alert.alert('Missing Information', 'Please enter your height, weight, and select a goal.');
      return;
    }

    const AiResponse = await fetch('http://192.168.1.12:3001/generatedietplan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        height: height,
        weight: weight,
        goal: selectedGoal,
        gender: selectedGender
      })
    })

    const aiData = await AiResponse.json();


    const jsonMatch = aiData.dietPlan.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {

      const parsedDietPlan = JSON.parse(jsonMatch[1]);


      calculatedCalories = parsedDietPlan.Calories.toString();
      calculatedProteins = parsedDietPlan.proteins.toString();
      
    }

    
    const res = await fetch('http://192.168.1.12:3000/updateprofile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.email,
        height: height,
        weight: weight,
        goal: selectedGoal,
        gender: selectedGender,
        calories: calculatedCalories,
        Proteins: calculatedProteins
      })
    })
    const data = await res.json();
    if (data.user) {
      Alert.alert('Profile Created', 'Your profile has been created successfully!');
      setUser(data.user);
      router.replace('/(tabs)/Home');
    }
    else {
      Alert.alert("Error", data);
      return;
    }


  };

  return (
    <LinearGradient
      colors={['#0f1538', '#131624', '#0d0e12']}
      start={[0, 0]}
      end={[1, 1]}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 20, paddingTop: 60, marginTop: 70 }}>

        <View style={{

          borderRadius: 30,
          borderTopLeftRadius: 50,
          borderBottomRightRadius: 50,
          padding: 25,
          width: '100%',
          alignItems: 'center',
          marginBottom: 50,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.3)',
        }}>
          <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: '#d9d3e8',
            textAlign: 'center',
            marginBottom: 15,
            textShadowColor: 'rgba(0, 0, 0, 0.8)',
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 5,
          }}>
            Welcome back {user.name}! Let's Get you Started!
          </Text>
          <Text style={{
            fontSize: 17,
            color: '#E0E0E0',
            textAlign: 'center',
            lineHeight: 26,
            fontStyle: 'italic',
          }}>
            You are just few steps away from setting your account. You'll be onboarded once we collect few information from you.
          </Text>
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: 50,
        }}>
          <TextInput
            style={{
              flex: 1,

              padding: 18,
              borderRadius: 15,
              color: '#fff',
              fontSize: 18,
              marginRight: 15,
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.4)',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 5,
            }}
            placeholder="Height (cm)"
            placeholderTextColor="#8c869c"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />
          <TextInput
            style={{
              flex: 1,

              padding: 18,
              borderRadius: 15,
              color: '#fff',
              fontSize: 18,
              marginLeft: 15,
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.4)',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 5,
            }}
            placeholder="Weight (kg)"
            placeholderTextColor="#8c869c"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
        </View>

        <View style={{ width: '100%', marginBottom: 40 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#b0ebdd',
            textAlign: 'center',
            marginBottom: 25,
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 3,
          }}>
            Please Select your Gender
          </Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            flexWrap: 'wrap',
          }}>
            {genders.map((gender) => (
              <TouchableOpacity
                key={gender}
                style={{
                  borderBlockColor: selectedGender === gender ? '#FFD700' : 'rgba(0, 0, 0, 0.4)',
                  paddingVertical: 18,
                  paddingHorizontal: 10,
                  borderRadius: 30,
                  borderTopLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  width: width * 0.35,
                  alignItems: 'center',
                  marginHorizontal: 5,
                  marginBottom: 15,
                  borderWidth: selectedGender === gender ? 2 : 1,
                  borderColor: selectedGender === gender ? '#FFF' : 'rgba(255, 255, 255, 0.2)',
                  shadowColor: selectedGender === gender ? '#FFD700' : '#000',
                  shadowOffset: { width: 0, height: selectedGender === gender ? 10 : 5 },
                  shadowOpacity: selectedGender === gender ? 0.7 : 0.3,
                  shadowRadius: selectedGender === gender ? 15 : 8,
                  transform: [{ scale: selectedGender === gender ? 1.1 : 1 }],
                }}
                onPress={() => setSelectedGender(gender)}
              >
                {gender === 'Male' ? (
                  <HugeiconsIcon
                    icon={Male02Icon}
                    color={selectedGender === gender ? '#c9b8f2' : 'white'}
                    width={40}
                    height={30} />
                ) : (
                  <HugeiconsIcon
                    icon={Female02Icon}
                    color={selectedGender === gender ? '#c9b8f2' : 'white'}
                    width={40}
                    height={30} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Goals Section */}
        <View style={{ width: '100%', marginBottom: 60 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#b0ebdd',
            textAlign: 'center',
            marginBottom: 25,
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 3,
          }}>
            Please select your Goal
          </Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            flexWrap: 'wrap',
          }}>
            {goals.map((goal) => (
              <TouchableOpacity
                key={goal}
                style={{
                  borderBlockColor: selectedGoal === goal ? '#FFD700' : 'rgba(255, 255, 255, 0.01)',
                  paddingVertical: 18,
                  paddingHorizontal: 10,
                  borderRadius: 25,
                  borderTopLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  width: width * 0.28,
                  alignItems: 'center',
                  marginHorizontal: 5,
                  marginBottom: 15,
                  borderWidth: selectedGoal === goal ? 2 : 1,
                  borderColor: selectedGoal === goal ? '#FFF' : 'rgba(255, 255, 255, 0.3)',

                  shadowOffset: { width: 0, height: selectedGoal === goal ? 10 : 5 },
                  shadowOpacity: selectedGoal === goal ? 0.7 : 0.3,
                  shadowRadius: selectedGoal === goal ? 15 : 8,
                  elevation: selectedGoal === goal ? 20 : 10,
                  transform: [{ scale: selectedGoal === goal ? 1.1 : 1 }],
                }}
                onPress={() => setSelectedGoal(goal)}
              >
                <Text style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: selectedGoal === goal ? '#c9b8f2' : '#E0E0E0',
                  textAlign: 'center',
                }}>
                  {goal}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#1bc432',
            padding: 20,
            borderRadius: 15,
            width: '85%',
            alignItems: 'center',
            position: 'absolute',
            bottom: 30,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.7,
            shadowRadius: 15,
            elevation: 20,
          }}
          onPress={onCreateProfile}
        >
          <Text style={{
            color: '#fff',
            fontSize: 22,
            fontWeight: 'bold',
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
          }}>
            Create Profile
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default ProfileSetupScreen;
