import React from "react";
import { View, Text, SafeAreaView, StatusBar } from "react-native";
import Login from "../../components/Login";

const SignUp = () => {
    return(
        <SafeAreaView 
        style={{ flex:1, backgroundColor: '#0B0531', justifyContent: 'center'}}
        
        >
        
            <StatusBar barStyle="light-content" />
        

            <Login 
                nomeBtn="Registrar" 
                frase="Já possui conta? Entre agora!" 
                link="SignIn"
                haveName={true}
            />

        </SafeAreaView>
    )
}

export default SignUp;