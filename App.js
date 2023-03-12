import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes/index";
import AuthContextProvider from "./src/contexts/auth";

const App = () => {

    return(
        <NavigationContainer>
            <AuthContextProvider>
                <Routes />
            </AuthContextProvider>
        </NavigationContainer>
    )
}

export default App;