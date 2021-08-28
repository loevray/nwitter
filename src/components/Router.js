import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Profile from "routes/Profile";
import Home from "../routes/Home";
import FirstScreen from "../routes/FirstScreen";
import Navigation from "../routes/Navigation";
import Aside from "routes/Aside";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
    const admin = true;
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
        {isLoggedIn && <Aside />}
    </Router>
    );
};

export default AppRouter;