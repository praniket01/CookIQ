import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef } from 'react';
import { Animated, Dimensions, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

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

const CARD_WIDTH = width * 0.7;
const SPACING = 15;

const FeaturesComponent = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={{ marginTop: 20, paddingBottom: 40, alignItems: 'center' }}>
      <MaskedView
              maskElement={
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'black', 
                  }}
                >
                  Our Features
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
                    opacity: 0,
                    fontSize: 28,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  Our Features
                </Text>
              </LinearGradient>
            </MaskedView>

      <Animated.FlatList
        data={featureData}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * (CARD_WIDTH + SPACING),
            index * (CARD_WIDTH + SPACING),
            (index + 1) * (CARD_WIDTH + SPACING),
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.95, 1, 0.95],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={{
                width: CARD_WIDTH,
                marginRight: SPACING,
                transform: [{ scale }],
              }}
            >
              <LinearGradient
                colors={['#0b0d12', '#1a2236', '#06162e']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  borderRadius: 20,
                  padding: 20,
                  height: 200,
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 6,
                  elevation: 6,
                }}
              >
                <Text style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#12b1c9',
                  marginBottom: 10,
                  textAlign: 'center',
                }}>
                  {item.heading}
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: '#E0E0E0',
                  lineHeight: 20,
                  opacity: 0.85,
                  textAlign: 'center'
                }}>
                  {item.description}
                </Text>
              </LinearGradient>
            </Animated.View>
          );
        }}
      />

      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      }}>
        {featureData.map((_, i) => {
          const inputRange = [
            (i - 1) * (CARD_WIDTH + SPACING),
            i * (CARD_WIDTH + SPACING),
            (i + 1) * (CARD_WIDTH + SPACING)
          ];

          const dotOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });

          const dotScale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.4, 0.8],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={i}
              style={{
                height: 5,
                width: 5,
                borderRadius: 5,
                marginHorizontal: 6,
                backgroundColor: 'white',
                opacity: dotOpacity,
                transform: [{ scale: dotScale }]
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default FeaturesComponent;
