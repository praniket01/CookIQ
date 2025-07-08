
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

const Navbar = () => {
  const router = useRouter();

  return (
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 999,
    }}>
      <SafeAreaView>
        <BlurView
          intensity={50}
          tint="dark"
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: 'rgba(15, 21, 56, 0.5)',
          }}
        >
          <Image 
            source={require('../../assets/images/Logosplast.jpg')} 
            style={{
              width: 60,
              height: 60,
            }}
          />
            

          <TouchableOpacity
            onPress={() => router.push('/auth/Signin')}
            style={{
              borderRadius: 12,
              overflow: 'hidden',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.4,
              shadowRadius: 8,
            }}
          >
            <LinearGradient
              colors={['#10b589', '#65ad99', '#75b4c7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 18,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
                Get Started
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </BlurView>
      </SafeAreaView>

      <LinearGradient
        colors={[
          'rgba(15, 21, 56, 0.6)', 
          'rgba(15, 21, 56, 0.4)',
          'rgba(15, 21, 56, 0.2)',
          'rgba(15, 21, 56, 0)'   
        ]}
        style={{
          height: 40,  
          width: '100%',
        }}
      />


    </View>
  );
};

export { Navbar };

