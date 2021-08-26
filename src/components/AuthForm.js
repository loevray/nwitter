import { authService } from "fbase";
import React, { useState } from "react";

const AuthForm = () => {
    // 1) useState 사용해서 input 태그의 이메일, 패스워드 조작.
    // 2) newAccount는 가입or로그인 화면 제어
    // 3) error는 에러메시지 출력용.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
/*  react에선 input태그가 입력받은 value를 사용자에게 보여주지 않음.
    각 input마다 onChange 이벤트에 함수를 부여해서 제어. */
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email"){
            setEmail(value);
        } else if(name === "password") {
            setPassword(value);
        }
    };
    //newAccount 참거짓 판별 후 가입or로그인 버튼 출력.
    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            if(newAccount){
                await authService.createUserWithEmailAndPassword(email, password);
            } else {
                await authService.signInWithEmailAndPassword(email, password);
            }
        } catch(error) {
            setError(error.message);
        }
    };
    const toggleAccount = () => setNewAccount(prev => !prev);
    return(
        <>
        <form onSubmit={onSubmit}>
        <input name="email" type="text" placeholder="Email" value={email} onChange={onChange} autoComplete="username" required/>
        <input name="password" type="password" placeholder="Password" value={password} onChange={onChange} autoComplete="current-password" required/>
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} required/>
        {error}
    </form>
    <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account" }</span>
    </>
    );
};
export default AuthForm;