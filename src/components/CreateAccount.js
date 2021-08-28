import { authService } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/CreateAccount.css"

const CreateAccount = (props) => {
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
    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            await authService.createUserWithEmailAndPassword(registerEmail, registerPassword);
            alert("가입 완료");
            history.push("/home")
            authService.languageCode = "ko";
            emailVerification();
            } catch(error) {
            alert(error.message);
            window.location.replace("/");
        }
    };
    const onClick = () => {
        props.setSignUp(false);
    }
    const emailVerification = () => {
        authService.currentUser.sendEmailVerification()
        .then(() => {
            alert("verification link sent to your email. please check email.");
        });
    };
    return(
        <>
        <span>회원 가입</span>
        <form onSubmit={onSubmit} className="register_form">
            <input 
            className="register_form_id" 
            name="register_email" 
            type="text" 
            placeholder="Email" 
            value={registerEmail} 
            onChange={onChange} 
            required/>
            <input 
            className="register_form_password" 
            name="register_password" 
            type="password" 
            placeholder="Password" 
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