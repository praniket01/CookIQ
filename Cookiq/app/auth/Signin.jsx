import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useContext, useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { UserDetailContext } from "../../context/UserDetailContext.jsx";
import { auth } from "../../services/FirebaseConfig.tsx";

const router = useRouter();

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser } = useContext(UserDetailContext);
    const [loading, setLoading] = useState(false);

    const onClick = async () => {

        setLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                if (!email || !password) {
                    Alert.alert("Missing Fields", "Please Enter all Fields");
                    return;
                }
                const res = await fetch('https://cookiq-1.onrender.com/getuser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    })
                })
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                    setLoading(false);
                    router.replace('../(tabs)/Home')

                }
                else {
                    const data = await res.json();
                    Alert.alert("Invalid Credentials", data.message);
                    setLoading(false);
                }

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert(errorMessage);
                setLoading(false);
            });



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
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                    }}
                >

                    <Image
                        source={require('../../assets/images/LoginImg.jpg')}
                        contentFit="cover"
                        style={{
                            height: 500,
                            width: 500,
                            marginBottom: 150
                        }}
                    />
                    <View style={{ width: '100%', marginTop: -20 }}>
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
                            keyboardType="email-address"
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
                            value={password}
                        />

                        {/* Sign In Button */}
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
                                    {
                                        loading ? (
                                            <ActivityIndicator size="small" color='#fff' />
                                        ) : (
                                            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                                                Sign In
                                            </Text>
                                        )
                                    }
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <Text style={{
                            color: "white", textAlign: "center",
                            fontSize: 15, marginTop: 15
                        }}>Don't have an Account?
                        </Text>
                        <Link href={"/auth/Signup"}>
                            <Text style={{
                                color: "#f0a102", textAlign: "center",
                                fontSize: 15, marginTop: 10, fontWeight: "bold"
                            }}>

                                Create New Account

                            </Text>
                        </Link>

                    </View>
                </KeyboardAvoidingView>

            </LinearGradient>
        </KeyboardAwareScrollView>
    );
};

export default Signin;

