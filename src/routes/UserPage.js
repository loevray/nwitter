import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import "./UserPage.css";
import UserPageTop from "components/UserPages/UserPageTop";
import UserPageBot from "components/UserPages/UserPageBot";

const UserPage = ({ match, userObj }) => {
  const [userId, setUserId] = useState("");
  const [clickOn, setClickOn] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (match.params.id) {
      if (match.params.id === userObj.uid) {
        history.push("/profile");
      }
      const userId = match.params.id;
      setUserId(userId);
    }
    console.log("유저페이지가 렌더링함");
  }, []);
  return (
    <div className="profile">
      <UserPageTop userId={userId} clickOn={clickOn} setClickOn={setClickOn} />
      <div className="profile_bottom">
        <UserPageBot userId={userId} clickOn={clickOn} userObj={userObj} />
      </div>
    </div>
  );
};
export default UserPage;
