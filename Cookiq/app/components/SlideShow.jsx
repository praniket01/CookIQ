import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const images = [
    require('../../assets/images/homepage2.jpg'),
    require('../../assets/images/3.jpg'),
    require('../../assets/images/4.jpg'),
    require('../../assets/images/fruits.jpg'),
    require('../../assets/images/meal.jpg'),
];

export const Slideshow = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % images.length;
            flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
            setCurrentIndex(nextIndex);
        }, 2000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <View>
            <Animated.FlatList
                ref={flatListRef}
                data={images}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Image
                        source={item}
                        style={{ width, height: height * 0.5 }}
                        resizeMode="cover"
                    />
                )}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
            />

            <View style={{
                flexDirection: 'row',
                position: 'absolute',
                bottom: 10,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {images.map((_, i) => {
                    const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [8, 16, 8],
                        extrapolate: 'clamp',
                    });
                    const dotColor = scrollX.interpolate({
                        inputRange,
                        outputRange: ['#888', '#fff', '#888'],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            key={i}
                            style={[{
                                
                                height: 8,
                                borderRadius: 4,
                                marginHorizontal: 5,
                            }, { width: dotWidth, backgroundColor: dotColor }]}
                        />
                    );
                })}
            </View>
        </View>
    );
};