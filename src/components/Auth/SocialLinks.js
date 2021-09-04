import { authService, dbService, fireBaseInstance } from "fbase";
import React from "react";
import { useHistory } from "react-router-dom";

const SocialLinks = () => {
    //가입하면 newAccount가 거짓이니 false로 바꿔주고, 반대도 마찬가지로 뒤집어주는 작업.
    //구글, 깃헙으로 로그인
    const history = useHistory();
    const onSocialClick = async (event) => {
        const { target: { name }} = event;
        let provider;
        let a = "";
        if(name === "google"){
            provider = new fireBaseInstance.auth.GoogleAuthProvider();
            provider.setCustomParameters({
                prompt: "select_account"
            });
        } else if(name === "github"){
            provider = new fireBaseInstance.auth.GithubAuthProvider();
        }
        await authService.signInWithPopup(provider);
        const user = authService.currentUser;
        user.providerData.forEach((profile) => {
            a = profile.photoURL;
        });
        const userSetObj = {
            profileImg: a,
            backgroundImg: "sociallinks"
        };
        await dbService.collection("userInfo").doc(user.uid).set(userSetObj);
        history.push("/home");
    };
    return(
        <>
        <button onClick={onSocialClick} name="google">Login with Google</button>
        <button onClick={onSocialClick} name="github">Login with Github</button>
        </>
    );
};

export default SocialLinks;