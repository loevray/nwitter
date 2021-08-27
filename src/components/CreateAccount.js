import { authService } from "fbase";
import React, { useState } from "react";
import "../css/CreateAccount.css"

const CreateAccount = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
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
            window.location.replace("/home");
            } catch(error) {
            alert(error.message);
            window.location.replace("/");
        }
    };
    return(
    <div className="register_wrapper">
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
        <button>닫기</button>
    </div>
    );
};

export default CreateAccount;