import React, { useState } from "react";
import Home from "../pages/Home";
import AuthRoutes from "./auth.routes";

const Routes = () => {

    const [ signed, setSigned ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    return(
        signed ? <View></View> : <AuthRoutes />
    )
}

export default Routes;