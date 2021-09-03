import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import "../css/App.css";
import GlobalStyle from "./GlobalStyle";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          profileImg: user.photoURL,
          creationTime: user.metadata.creationTime,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () =>{
    const user = authService.currentUser;
      setUserObj({
        displayName: user.displayName,
        uid: user.uid,
        email: user.email,
        profileImg: user.photoURL,
        creationTime: user.metadata.creationTime,
        updateProfile: (args) => user.updateProfile(args),
      });
  };
  return (
    <>
    <GlobalStyle />
    {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "initializing..." }
    </>
  );
}

export default App;
