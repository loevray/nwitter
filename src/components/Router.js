import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "../routes/Home";
import FirstScreen from "../routes/FirstScreen";
import Navigation from "../routes/Navigation";
import Aside from "routes/Aside";
import Search from "routes/Search";
import UserPage from "routes/UserPage";
import NweetDetailPage from "./Detail/NweetDetailPage";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route
              render={(props) => (
                <Navigation location={props.location} userObj={userObj} />
              )}
            />
            <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route exact path="/home">
                <Home userObj={userObj} />
              </Route>
              <Route
                exact
                path="/:id"
                render={(props) => (
                  <UserPage
                    userObj={userObj}
                    match={props.match}
                    refreshUser={refreshUser}
                  />
                )}
              />
            </Switch>
            <Route
              exact
              path="/:id/status/:postId"
              render={(props) => (
                <NweetDetailPage match={props.match} userObj={userObj} />
              )}
            />
            <Route
              exact
              path="/search/:value"
              render={(props) => (
                <Search userObj={userObj} match={props.match} />
              )}
            />
            <Route>
              <Aside />
            </Route>
          </>
        ) : (
          <>
            <Route path="*">
              <FirstScreen
                userObj={userObj}
                isLoggedIn={isLoggedIn}
                refreshUser={refreshUser}
              />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
