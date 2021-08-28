import { authService } from "fbase";
import React from "react";
import { Route } from "react-router-dom";

const PrivateRoute = ({component: Component, isLoggedIn, ...rest}) => {
    return(
        <Route 
        {...rest}
        redner={(props) => isLoggedIn}
        />
    );
};

export default PrivateRoute;