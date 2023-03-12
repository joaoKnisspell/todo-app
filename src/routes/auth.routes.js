import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AuthStack = createNativeStackNavigator();

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";

const AuthRoutes = () => {
    return(
        <AuthStack.Navigator
          screenOptions={{
            animation: 'fade',
          }}
        >
            <AuthStack.Screen
              name="SignIn"
              component={SignIn}
              options={{
                headerShown: false,
              }} 
            />
            <AuthStack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                headerShown: false,
              }} 
            />
            <AuthStack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false
              }}
            />
        </AuthStack.Navigator>
    )
}

export default AuthRoutes;
