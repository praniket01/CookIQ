import { useContext, useState } from 'react';
import { Alert, Dimensions, Text, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { UserDetailContext } from "../../context/UserDetailContext";

const { width } = Dimensions.get('window');

const CircularSpeedometer = ({
  value, 
  maxValue, 
  units,
  label, 
  color, 
  size = 120,
  strokeWidth = 10,
  backgroundColor = 'rgba(255, 255, 255, 0.1)', 
  textColor = '#E0E0E0' 
}) => {
  const radius = (size - strokeWidth) / 2; 
  const circumference = 2 * Math.PI * radius; 

  const progress = Math.max(0, Math.min(value, maxValue));
  const strokeDashoffset = circumference - (progress / maxValue) * circumference;
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress arc */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round" 
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </G>
      </Svg>
      {/* Central text displaying value and label */}
      <View style={{
        position: 'absolute', 
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{ fontSize: size * 0.18, fontWeight: 'bold', color: textColor }}>
          {Math.round(value)} / {label}
        </Text>
        <Text style={{ fontSize: size * 0.12, color: textColor, opacity: 0.8 }}>
          {units}
        </Text>
      </View>
    </View>
  );
};

const DashboardCard = () => {
  const {user ,setUser} = useContext(UserDetailContext);

  const [targetCalories, setTargetCalories] = useState(user.calories);
  const [targetProteins, setTargetProteins] = useState(user.Proteins); 

  const [currentCalories, setCurrentCalories] = useState(0); 
  const [currentProteins, setCurrentProteins] = useState(0); 

  const [calorieDeductionInput, setCalorieDeductionInput] = useState('');
  const [proteinDeductionInput, setProteinDeductionInput] = useState('');


  const handleIntake = () => {
    const caloriesToDeduct = parseFloat(calorieDeductionInput);
    const proteinsToDeduct = parseFloat(proteinDeductionInput);

    if (isNaN(caloriesToDeduct) || caloriesToDeduct <= 0 || isNaN(proteinsToDeduct) || proteinsToDeduct <= 0) {
      Alert.alert('Invalid Input', 'Please enter valid positive numbers for calories and proteins.');
      return;
    }

    setCurrentCalories(prev => prev + caloriesToDeduct);
    setCurrentProteins(prev => prev + proteinsToDeduct);

    setCalorieDeductionInput('');
    setProteinDeductionInput('');
  };

  const caloriesRemaining = targetCalories - currentCalories;
  const proteinsRemaining = targetProteins - currentProteins;


  return (
    <View style={{
      backgroundColor: 'rgba(0, 0, 0, 0.4)', 
      borderRadius: 20,
      padding: 20,
      marginVertical: 20,
      width: width * 0.9,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    }}>
      <Text style={{
        fontSize: 22,
        fontWeight: 'bold',
        color: '#d9d3e8', 
        marginBottom: 25,
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
      }}>Daily Intake Overview</Text>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 30,
      }}>
        {/* Calories Speedometer */}
        <CircularSpeedometer
          value={currentCalories} 
          maxValue={targetCalories} 
          units={"kcal"}
          label={`${targetCalories}`}
          color="#FFD700"
          textColor="#FFD700"
          size={width * 0.4}
          strokeWidth={12}
        />

        {/* Protein Speedometer */}
        <CircularSpeedometer
          value={currentProteins} 
          maxValue={targetProteins} 
          units={"g"}
          label={`${targetProteins}`}
          color="#12b1c9"
          textColor="#12b1c9"
          size={width * 0.4} 
          strokeWidth={12}
        />
      </View>

      <View style={{
        width: '100%',
        marginBottom: 20,
        alignItems: 'center',
      }}>
        
      </View>

      <View style={{
        marginTop: 10,
        alignItems: 'center',
      }}>

      </View>
    </View>
  );
};

export { DashboardCard };

