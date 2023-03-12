import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator, Keyboard, Te } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firebase from "../../services/FirebaseConnection";
import { AuthContext } from "../../contexts/auth";

const Login = ({ nomeBtn, frase, link, haveName }) => {

    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const [ name, setName ] = useState();
    const navigation = useNavigation();
    const { user, setUser } = useContext(AuthContext);
    const [ loading, setLoading ] = useState(false); 

    async function SignIn(){
        setLoading(true)
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then( (value) => {
            setUser({
                uid: value.user.uid,
            })
            Keyboard.dismiss();
            navigation.navigate("Home");
            setLoading(false);
        })
        .catch((error) => {
            if(error.code === "auth/user-not-found"){
                alert("Email não cadastrado!")
            }else if(error.code === "auth/wrong-password"){
                alert("Senha Incorreta!")
            }
        })
    }

    async function SignUp(){
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async (value) => {
            await firebase.database().ref("users").child(value.user.uid).set({
                uid: value.user.uid,
                email: value.user.email,
                nome: name
            })
            .then(() => {
                setUser({
                    uid: value.user.uid,
                })
                Keyboard.dismiss();
                navigation.navigate("Home");
            })
        })
        .catch((error) => {
            if(error.code === "auth/email-already-in-use"){
                alert("Email já cadastrado!")
            }else if(error.code === "auth/weak-password"){
                alert("Senha muito fraca!")
            }   
        })
    }

    const handleSign = () => {
        if(nomeBtn === 'Entrar' && email !== '' && password !== ''){
            SignIn()
            setName('')
            setEmail('')
            setPassword('')
        }else if(nomeBtn === 'Registrar' && name !== '' && email !== '' && password !== ''){
            SignUp()
            setName('')
            setEmail('')
            setPassword('')
        }else{
            alert("Preencha todos os campos!")
        }
    }

    return(
        <View style={{ paddingHorizontal: 32 }}>

            <Image style={styles.logo} source={require("./logo.png")} />

            {haveName && 
                <TextInput
                    style={[styles.input, { marginBottom: 15 }]}
                    placeholder="Nome"
                    placeholderTextColor="gray"
                    value={name}
                    onChangeText={(value) => setName(value)}
                />
            }

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="gray"
                value={email}
                onChangeText={(value) => setEmail(value)}
                keyboardType="email-address"
            />

            <TextInput
                style={[styles.input, {marginTop: 15}]}
                placeholder="Senha"
                placeholderTextColor="gray"
                value={password}
                onChangeText={(value) => setPassword(value)}
                secureTextEntry={true}
            />

            <TouchableOpacity style={styles.btn} onPress={handleSign}>
                <View style={styles.btnArea}>
                    {loading ? <ActivityIndicator size={30} color="#FFF" /> : <Text style={{color: "#FFF", fontSize: 15, fontWeight:600}}>{nomeBtn}</Text>}
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={{marginTop: 16}} onPress={() => navigation.navigate(link)}>
                <View>
                     <Text style={{color: "#FFF", fontSize: 15, fontWeight:400, textAlign: 'center'}}>{frase}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    logo: {
        alignSelf: 'center',
        marginBottom: 32
    },

    input: {
        backgroundColor: "#272244",
        height: 56,
        padding: 15,
        fontSize: 15,
        borderRadius: 8,
        color: '#FFF'
    },

    btn:{
        backgroundColor:"#C6409A",
        color: '#FFF',
        height: 56,
        borderRadius: 8,
        marginTop: 32
    },

    btnArea: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },

})

export default Login;