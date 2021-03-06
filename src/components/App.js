import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import "../css/App.css";
import GlobalStyle from "./GlobalStyle";
import NewLoading from "./NewLoading";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          userId: user.email.split("@")[0],
          creationTime: user.metadata.creationTime,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      creationTime: user.metadata.creationTime,
      userId: user.email.split("@")[0],
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
      <GlobalStyle />
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        <NewLoading />
      )}
    </>
  );
}

export default App;
