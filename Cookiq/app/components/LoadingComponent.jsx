import LottieView from 'lottie-react-native';
import { useMemo } from 'react';
import { Dimensions, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const quotes = [
    "Cooking is an art, but all art requires knowing something about the techniques and materials.",
    "No one is born a great cook, one learns by doing.",
    "Good food is the foundation of genuine happiness.",
    "Cooking is love made visible.",
    "The secret ingredient is always love.",
    "In cooking, as in all the arts, simplicity is the sign of perfection.",
    "Happiness is homemade.",
    "Life is a combination of magic and pasta.",
    "Food tastes better when you eat it with your family.",
    "A recipe has no soul. You, as the cook, must bring soul to the recipe.",
    "First we eat, then we do everything else.",
    "Good food ends with good talk."
];

const LoadingComponent = () => {
    // Pick a random quote once per render
    const randomQuote = useMemo(() => {
        const index = Math.floor(Math.random() * quotes.length);
        return quotes[index];
    }, []);

    return (
        <View style={{
            "flex": 1,
            // "backgroundColor": '#0f1538',
            "justifyContent": 'center',
            "alignItems": 'center',
            // "paddingHorizontal": 20,
        }}>
            <LottieView
                source={require('../../assets/images/Animation2.json')}
                autoPlay
                loop
                style={{
                    "width": width * 0.7,
                    "height": width * 0.7,
                }}
            />
            <Text style={{
                // "marginTop": 5,
                "color": '#10d8eb',
                "fontSize": 18,
                "fontStyle": 'italic',
                "textAlign": 'center',
                "lineHeight": 28,
            }}>
                "{randomQuote}"
            </Text>
        </View>
    );
};

export default LoadingComponent;
