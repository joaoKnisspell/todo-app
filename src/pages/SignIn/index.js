import React, { useState, useContext } from "react";
import { SafeAreaView, Text, TextInput, StyleSheet, StatusBar } from "react-native";
import { AuthContext } from "../../contexts/auth";
import Login from "../../components/Login";

const SignIn = () => {

    const { user, setUser } = useContext(AuthContext)

    return(
        <SafeAreaView 
        style={{ flex:1, backgroundColor: '#0B0531', justifyContent: 'center'}}
        >

            <StatusBar barStyle="light-content" />
        

            <Login 
                nomeBtn="Entrar" 
                frase="Ainda não tem conta? Crie agora!" 
                link="SignUp"
            />


        </SafeAreaView>
    )
}


export default SignIn;