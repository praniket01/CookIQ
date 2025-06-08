import { LinearGradient } from 'expo-linear-gradient'
import { Link, useRouter } from 'expo-router'
import { useContext, useState } from 'react'
import { Alert, Image, Text, View } from 'react-native'
import Button from '../../components/shared/Button'
import Input from '../../components/shared/Input'
import { UserDetailContext } from "../../context/UserDetailContext.jsx"
// import auth from '../../services/FirebaseConfig.js'
import colors from '../../shared/colors'

const router = useRouter();

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser } = useContext(UserDetailContext);

    const onClick = async () => {
        if (!email || !password) {
            Alert.alert("Missing Fields", "Please Enter all Fields");
            return;
        }
        const res = await fetch('http://192.168.1.12:3000/getuser', {
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
            setUser(data);
            router.replace('../(tabs)/Home')
        }
        else {
            const data = await res.json();
            Alert.alert("Invalid Credentials", data.message);
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert(errorMessage);
            });

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
                    Welcome back
                </Text>
                <View style={{
                    marginTop: 50,
                    width: '90%',
                }}>
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
                        title="Sign In"
                        backgroundColor="#05e841"
                        onPress={() => { onClick() }}
                    />

                    <Text style={{
                        color: colors.WHITE, textAlign: "center",
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
                </View >
            </View>
        </LinearGradient>

    )
}

export default Signin