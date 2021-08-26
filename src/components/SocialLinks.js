import { authService, fireBaseInstance } from "fbase";
import React from "react";

const SocialLinks = () => {
    //가입하면 newAccount가 거짓이니 false로 바꿔주고, 반대도 마찬가지로 뒤집어주는 작업.
    //구글, 깃헙으로 로그인
    const onSocialClick = async (event) => {
        const { target: { name }} = event;
        let provider;
        if(name === "google"){
            provider = new fireBaseInstance.auth.GoogleAuthProvider();
        } else if(name === "github"){
            provider = new fireBaseInstance.auth.GithubAuthProvider();
        }
        await authService.signInWithPopup(provider);
    };
    return(
        <>
        <button onClick={onSocialClick} name="google">Login with Google</button>
        <button onClick={onSocialClick} name="github">Login with Github</button>
        </>
    );
};

export default SocialLinks;