import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import { UserDetailContext } from '../../context/UserDetailContext';
import { auth } from '../../services/FirebaseConfig';
import colors from '../../shared/colors';


const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {user,setUser} = useContext(UserDetailContext);
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
                            credits : 10
                        })
                    })
                    if (res.ok) {
                        const data = await res.json();
                        Alert.alert('Success', 'User registered successfully!');
                        setUser(data.user);
                        //TODO Navigate to Home Screen
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
                    console.log("error in create user with email", error)
                    Alert.alert("Registration failed", errorMessage)
                    return;
                })


        } catch (error) {
            console.log("error in try-cathc", error)
        }

    }

    return (
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
                        width: 150,
                        height: 150,
                        marginTop: 100
                    }}
                    source={require('../../assets/images/logo.png')} />
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
                    <Input placeholder="Full Name" onChangeText={setName} />
                    <Input placeholder="Email" onChangeText={setEmail} />
                    <Input placeholder="Password" password={true} onChangeText={setPassword} />

                </View>
                <View
                    style={{
                        marginTop: 15,
                        width: "90%"
                    }}
                >

                    <Button
                        title="Create Account"
                        backgroundColor="#12b1c9"
                        onPress={() => { onClick() }}
                    />

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

    )
}

export default Signup;