import { authService } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/CreateAccount.css"

const CreateAccount = ({ setSignUp }) => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const history = useHistory();
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "register_email") {
            setRegisterEmail(value);
        } else if(name === "register_password") {
            setRegisterPassword(value);
        }
    };
/*     const emailVerification = () => {
        authService.currentUser.sendEmailVerification()
        .then(() => {
            alert("verification link sent to your email. please check email.");
        });
    }; */
    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            await authService.createUserWithEmailAndPassword(registerEmail, registerPassword);
            authService.languageCode = "ko";
            alert("가입완료");
            history.push("/home")
            // emailVerification();
            // window.localStorage.setItem("sendMail", true);
            } catch(error) {
            console.log(error.message, "에러!");
            window.location.replace("/");
        }
    };
    const onClick = () => {
        setSignUp(false);
    }
    return(
        <>
        <span>회원 가입</span>
        <form onSubmit={onSubmit} className="register_form">
            <input 
            className="register_form_id" 
            name="register_email" 
            type="text" 
            placeholder="Email" 
            autoComplete="off"
            value={registerEmail} 
            onChange={onChange} 
            required/>
            <input 
            className="register_form_password" 
            name="register_password" 
            type="password" 
            placeholder="Password" 
            autoComplete="new-password"
            value={registerPassword} 
            onChange={onChange} 
            required
            />
            <input 
            className="register_form_submit" 
            type="submit" 
            value="Register" 
            required
            />
        </form>
        <button onClick={onClick}>닫기</button>
        </>
    );
};

export default CreateAccount;