import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Profile from "routes/Profile";
import Home from "../routes/Home";
import FirstScreen from "../routes/FirstScreen";
import Navigation from "../routes/Navigation";
import Aside from "routes/Aside";
import Verified from "routes/Verified";
import { useEffect, useState } from "react";
import Search from "routes/Search";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
    const [verifying, setVeyrifying] = useState(false);
    const [notWatching, setNotWatching] = useState(true);
    useEffect(() => {
        const emailsended = JSON.parse(window.localStorage.getItem("sendMail"));
        if(emailsended === null || emailsended === undefined || emailsended === false) {
            return;
        } else {
            setVeyrifying(true);
        }
    }, [verifying]);
    return(
    <Router>
        {isLoggedIn && notWatching &&<Navigation userObj={userObj} />}
        <Switch>
            {verifying &&
            <Route exact path="/verifying">
            <Verified setNotWatching={setNotWatching}/>
            </Route>
            }
            {isLoggedIn ? (
            <>
            <Redirect from="/" to="/home" />
                <Route exact path="/home">
                    <Home userObj={userObj} />
                </Route>
                <Route exact path="/profile">
                    <Profile userObj={userObj} refreshUser={refreshUser} />
                </Route>
                <Route exact path="/search">
                    <Search />
                </Route>
            </>
            ) : (
                <>
                <Route path="*">
                    <FirstScreen userObj={userObj} isLoggedIn={isLoggedIn} refreshUser={refreshUser}/>
                </Route>
                </>
                )}
        </Switch>
        {isLoggedIn && notWatching && <Aside />}
    </Router>
    );
};

export default AppRouter;