import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Profile from "routes/Profile";
import Home from "../routes/Home";
import FirstScreen from "../routes/FirstScreen";
import Navigation from "./Navigation";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
    return(
    <Router>
        {isLoggedIn && <Navigation userObj={userObj} />}
        <Switch>
            {isLoggedIn ? (
            <>
            <Redirect from="/" to="/home"/>
                <Route exact path="/home">
                    <Home userObj={userObj} />
                </Route>
                <Route exact path="/profile">
                    <Profile userObj={userObj} refreshUser={refreshUser} />
                </Route>
            </>
            ) : (
                <>
                <Route path="*">
                    <FirstScreen isLoggedIn={isLoggedIn} />
                </Route>
                </>
                )}
        </Switch>
    </Router>
    );
};

export default AppRouter;