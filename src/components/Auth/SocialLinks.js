import { authService, dbService, fireBaseInstance } from "fbase";
import React from "react";
import { useHistory } from "react-router";

const SocialLinks = () => {
  const history = useHistory();
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new fireBaseInstance.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });
    } else if (name === "github") {
      provider = new fireBaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider).then(async (user) => {
      const {
        additionalUserInfo: { isNewUser },
      } = user;
      if (isNewUser) {
        const newUser = authService.currentUser;
        const userInfo = {
          follower: [],
          following: [],
          displayName: newUser.displayName,
          email: newUser.email,
          photoUrl: newUser.photoURL,
        };
        const userInfoRef = dbService.collection("userInfo");
        await userInfoRef.doc(`${user.user.uid}`).set(userInfo);
      }
    });
    history.push("/home");
  };
  return (
    <>
      <button onClick={onSocialClick} name="google">
        Login with Google
      </button>
      <button onClick={onSocialClick} name="github">
        Login with Github
      </button>
    </>
  );
};

export default SocialLinks;
