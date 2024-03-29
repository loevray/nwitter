import { authService, dbService, storageService } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router";
import "../css/CreateAccount.css";

const CreateAccount = ({ setSignUp, refreshUser }) => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const history = useHistory();
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "register_email") {
      setRegisterEmail(value);
    } else if (name === "register_password") {
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
    try {
      await authService
        .createUserWithEmailAndPassword(registerEmail, registerPassword)
        .then(async (user) => {
          let profileUrl = "";
          const newUser = user.user;
          const userId = newUser.email.split("@")[0];
          const storageRef = storageService
            .ref()
            .child(`userDeafultSet/profile_img/userprofile.png`);
          profileUrl = await storageRef.getDownloadURL();
          await newUser.updateProfile({
            photoURL: profileUrl,
          });
          if (newUser.displayName === null) {
            const email = newUser.email;
            const emailToNickname = email.split("@");
            await newUser.updateProfile({
              displayName: emailToNickname[0],
            });
          }
          const userInfo = {
            follower: [],
            following: [],
            displayName: newUser.displayName,
            email: newUser.email,
            photoUrl: newUser.photoURL,
            userId: userId,
          };
          const userInfoRef = dbService.collection("userInfo");
          await userInfoRef.doc(`${userId}`).set(userInfo);
          refreshUser();
          history.push("/home");
        })
        .catch((e) => {
          console.log("에러:", e);
        });
      authService.languageCode = "ko";
      // alert("가입완료");
      // emailVerification();
      // window.localStorage.setItem("sendMail", true);
    } catch (error) {
      console.log(error.message, "에러!");
      window.location.replace("/");
    }
  };
  const onClick = () => {
    setSignUp(false);
  };
  return (
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
          required
        />
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
