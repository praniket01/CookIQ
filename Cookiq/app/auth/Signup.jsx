import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { UserDetailContext } from '../../context/UserDetailContext';
import { auth } from '../../services/FirebaseConfig';
import colors from '../../shared/colors';


const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser } = useContext(UserDetailContext);
    const router = useRouter();

    const onClick = async () => {
        try {
            if (!name || !email || !password) {
                Alert.alert("Missing Fields", "Please enter all Fields");
                return
            }
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    const res = await fetch('http://192.168.1.12:3000/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: name,
                            email: email,
                            password: password,
                            credits: 10
                        })
                    })
                    if (res.ok) {
                        const data = await res.json();
                        Alert.alert('Success', 'User registered successfully!');
                        setUser(data.user);
                        setName('');
                        setEmail('');
                        setPassword('')
                        router.replace('/(tabs)/Home');

                    } else {
                        const errorData = await res.json();
                        Alert.alert('Registration Failed', errorData.message || 'Something went wrong on the server.');
                        console.error('Server error:', res.status, errorData);
                    }
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    Alert.alert("Registration failed", errorMessage)
                    return;
                })


        } catch (error) {
            console.log("error in try-cathc", error)
        }

    }

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20,
            }}
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled"
        >
            <LinearGradient
                colors={['#2c3e50', '#000000']}
                style={{ flex: 1 }}
            >

                <View style={{
                    display: "flex",
                    alignItems: "center",
                }}>
                    <Image
                        style={{
                            width: 500,
                            height: 500,
                        }}
                        source={require('../../assets/images/SignUp.png')} />
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 35,
                        color: colors.WHITE,
                        fontFamily: "Gill Sans",
                        marginTop: 20
                    }}>
                        Create New Account
                    </Text>
                    <View style={{
                        marginTop: 50,
                        width: '90%',
                    }}>

                        <TextInput
                            style={{
                                height: 50,
                                backgroundColor: '#1c1c2e',
                                borderRadius: 12,
                                paddingHorizontal: 15,
                                marginBottom: 20,
                                color: '#fff',
                                fontSize: 16,
                            }}
                            placeholder="Name"
                            placeholderTextColor="#ccc"
                            onChangeText={setName}
                            value={name}
                        />
                        <TextInput
                            style={{
                                height: 50,
                                backgroundColor: '#1c1c2e',
                                borderRadius: 12,
                                paddingHorizontal: 15,
                                marginBottom: 20,
                                color: '#fff',
                                fontSize: 16,
                            }}
                            placeholder="Email"
                            placeholderTextColor="#ccc"
                            onChangeText={setEmail}
                            value={email}
                        />
                        <TextInput
                            style={{
                                height: 50,
                                backgroundColor: '#1c1c2e',
                                borderRadius: 12,
                                paddingHorizontal: 15,
                                marginBottom: 20,
                                color: '#fff',
                                fontSize: 16,
                            }}
                            placeholder="Password"
                            placeholderTextColor="#ccc"
                            secureTextEntry
                            onChangeText={setPassword}
                            password={true}
                        />
                    </View>
                    <View
                        style={{
                            marginTop: 15,
                            width: "90%"
                        }}
                    >

                        <TouchableOpacity
                            onPress={onClick}
                            style={{
                                marginTop: 10,
                                borderRadius: 15,
                                overflow: 'hidden',
                            }}
                        >
                            <LinearGradient
                                colors={['#10b589', '#65ad99', '#75b4c7']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{
                                    paddingVertical: 14,
                                    alignItems: 'center',
                                    borderRadius: 15,
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Sign Up
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <Text style={{
                            color: colors.WHITE, textAlign: "center",
                            fontSize: 15, marginTop: 15
                        }}>Already have an Account?
                        </Text>
                        <Text style={{
                            color: colors.LIGHTWHITE, textAlign: "center",
                            fontSize: 15, marginTop: 10, fontWeight: "bold"
                        }}>
                            <Link href={'/auth/Signin'}>

                                Sign In
                            </Link>
                        </Text>

                    </View >
                </View>
            </LinearGradient>
        </KeyboardAwareScrollView>

    )
}

export default Signup;