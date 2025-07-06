
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Animated, View } from 'react-native';

const SplashScreen = () => {
    const scaleAnim = new Animated.Value(0);
    const router = useRouter();

    useEffect(() => {
        Animated.sequence([
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
                friction: 4,
                tension: 60,
            }),
            Animated.delay(3000),
        ]).start(() => {
        });
    }, []);

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#000', 
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Animated.Image
                source={require('../assets/images/Logosplast.png')} 
                style={[{
                    width: 250,
                    height: 250,
                }, { transform: [{ scale: scaleAnim }] }]}
                resizeMode="contain"
            />
        </View>
    );
};

export { SplashScreen };

