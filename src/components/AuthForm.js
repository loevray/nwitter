import { authService } from "fbase";
import React, { useState } from "react";

const AuthForm = () => {
    // 1) useState 사용해서 input 태그의 이메일, 패스워드 조작.
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
/*  react에선 input태그가 입력받은 value를 사용자에게 보여주지 않음.
    각 input마다 onChange 이벤트에 함수를 부여해서 제어. */
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "login_email"){
            setLoginEmail(value);
        } else if(name === "login_password") {
            setLoginPassword(value);
        }
    };
    //로그인
    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            await authService.signInWithEmailAndPassword(loginEmail, loginPassword);
            } catch(error) {
            console.log(error.message);
        }
    };
    return(
    <>
    <div className="login_form_wrapper">
        <form onSubmit={onSubmit} className="login_form">
            <input 
            className="login_form_id" 
            name="login_email" 
            type="text" 
            placeholder="Email" 
            value={loginEmail} 
            onChange={onChange} 
            autoComplete="username" 
            required />
            <input
            className="login_form_password" 
            name="login_password" 
            type="password" 
            placeholder="Password" 
            value={loginPassword} 
            onChange={onChange} 
            autoComplete="current-password"
            required />
            <input 
            className="login_form_submit" 
            type="submit" 
            value="Log In" 
            required />
        </form>
    </div>
    </>
    );
};
export default AuthForm;