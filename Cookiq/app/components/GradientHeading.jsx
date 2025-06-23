import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

const GradientHeading = () => {
  return (
    <View style={{ alignItems: 'center', marginVertical: 20 }}>
      <MaskedView
        maskElement={
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'black', // This gets masked by the gradient
            }}
          >
            Today's Meal Plan
          </Text>
        }
      >
        <LinearGradient
          colors={['#10b589', '#75b4c7', '#b18cd9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text
            style={{
              opacity: 0, // hide original text so only gradient shows
              fontSize: 28,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Today's Meal Plan
          </Text>
        </LinearGradient>
      </MaskedView>
    </View>
  );
};

export { GradientHeading };

