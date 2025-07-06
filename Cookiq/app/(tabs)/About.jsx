import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { UserDetailContext } from '../../context/UserDetailContext';
import auth from '../../services/FirebaseConfig';
import { GradientBackground } from "../ui/GradientProvider";

const About = () => {
  const router = useRouter();

  const { user, setUser } = useContext(UserDetailContext);
  console.log(user);
  const handleLogout = async () => {
    try {
      signOut(auth).then(()=>{
        console.log("User logged out successfully")
        console.log(user);
        setUser({});
        router.replace('/');
      }).catch((err)=>{
        console.log("Inside catch",err)
      });
  
    } catch (error) {
      console.log(error);
      Toast.show({
        "text1" : "Failed",
        "text2" : "Failed to signout",
        "position": "bottom",
        "avoidKeyboard" : true
      })
    }}

  return (
    <GradientBackground>
      <SafeAreaView
        style={{
          paddingHorizontal: 20,
          flex: 1,
          justifyContent: 'flex-start'
        }}>
        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <Image
            source={
              { uri: user.picture }
            }
            style={{
              width: 120,
              height: 120,
              marginTop: 100,
              borderRadius: 60,
              marginBottom: 30,
              borderWidth: 2,
              borderColor: '#fff'
            }}
          />
        </View>
        {[
          { label: 'Name', value: user?.name || '' },
          { label: 'Email', value: user?.email || '' },
          { label: 'Calories', value: user?.calories?.toString() || '0' },
          { label: 'Proteins', value: user?.Proteins?.toString() || '0' },
        ].map(({ label, value }) => (
          <View key={label} style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}>
            <Text style={{
              color: '#ccc',
              fontSize: 16,
              width: '30%',
            }}>{label}</Text>
            <TextInput
              value={value}
              editable={false}
              style={{
                width: '65%',
                backgroundColor: '#1e1e1e',
                color: '#fff',
                padding: 12,
                borderRadius: 10,
                fontSize: 16,
                borderWidth: 1,
                borderColor: '#333',
                textAlign: 'right'
              }}
            />
          </View>

        ))}
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            marginTop: 'auto',
            backgroundColor: '#ff4d4f',
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
          }}
        >
          <Text style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
          }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </GradientBackground>
  )
}

export default About