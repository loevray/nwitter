import React from "react";

const CreateAccount = () => {
    return(
    <div>
        <form onSubmit={onSubmit} className="register_form">
            <input className="register_form_id" name="email" type="text" placeholder="Email" value={email} onChange={onChange} autoComplete="username" required/>
            <input className="register_form_password" name="password" type="password" placeholder="Password" value={password} onChange={onChange} autoComplete="current-password" required/>
            <input className="register_form_submit" type="submit" value="Register" required/>
            {error}
        </form>
    </div>
    );
};

export default CreateAccount;