import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Animated, Dimensions, Text, View } from 'react-native';

const { width, height: screenHeight } = Dimensions.get('window');

const featureData = [
  {
    heading: 'Calculate Your Desired Calories',
    description: 'Cookiq intelligently calculates the optimal amount of calories you need to intake daily, aligning with your personal health goals.'
  },
  {
    heading: 'Cookiq Will Give You Amazing Recipes',
    description: 'As an AI-powered recipe generator, Cookiq provides you with three unique and delicious recipes based on your preferences, helping you choose the perfect meal.'
  },
  {
    heading: 'Personalized Nutrition Insights',
    description: 'Gain valuable insights into your eating habits and track your progress with easy-to-understand dashboards and reports.'
  },
  {
    heading: 'Effortless Food Logging',
    description: 'Log your meals quickly and efficiently. Our intuitive interface makes keeping track of your intake a breeze.'
  }
];

const APPROX_CARD_TOTAL_HEIGHT = 200;

const FeaturesComponent = ({ scrollY }) => {
  const [cardYPositions, setCardYPositions] = useState(Array(featureData.length).fill(null));
  const [componentY, setComponentY] = useState(0);

  const onComponentLayout = (event) => {
    setComponentY(event.nativeEvent.layout.y);
  };

  const onCardLayout = (event, index) => {
    const { y } = event.nativeEvent.layout;
    setCardYPositions(prev => {
      const newPositions = [...prev];
      newPositions[index] = y;
      return newPositions;
    });
  };

  return (
    <View style={{ width: '100%', alignItems: 'center' }} onLayout={onComponentLayout}>
      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFD700',
        textAlign: 'center',
        marginBottom: 30,
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
      }}>
        Our Smart Features
      </Text>

      {featureData.map((feature, index) => {
        const absoluteCardY = componentY + (cardYPositions[index] || 0);

        const animatedCardTranslationX = scrollY.interpolate({
          inputRange: [
            absoluteCardY - screenHeight,
            absoluteCardY - screenHeight / 2,
            absoluteCardY + APPROX_CARD_TOTAL_HEIGHT,
            absoluteCardY + APPROX_CARD_TOTAL_HEIGHT + screenHeight / 2
          ],
          outputRange: [width, 0, 0, width],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={index}
            onLayout={(event) => onCardLayout(event, index)}
            style={{
              transform: [{ translateX: animatedCardTranslationX }],
              width: '100%',
              marginBottom: 20,
              height: APPROX_CARD_TOTAL_HEIGHT - 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 10,
            }}
          >
            <LinearGradient
              colors={['#0b0d12', '#1a2236','#06162e']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 15,
                padding: 20,
                flex: 1,
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.15)',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#12b1c9',
                marginBottom: 10,
                textAlign: 'center',
              }}>
                {feature.heading}
              </Text>
              <Text style={{
                fontSize: 15,
                color: '#E0E0E0',
                textAlign: 'center',
                lineHeight: 22,
                opacity: 0.8,
              }}>
                {feature.description}
              </Text>
            </LinearGradient>
          </Animated.View>
        );
      })}
    </View>
  );
};

export default FeaturesComponent;
