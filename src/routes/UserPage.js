import React, { useEffect } from "react";
import { useState } from "react";
import "./UserPage.css";
import "../css/Profile.css";
import UserPageTop from "components/UserPages/UserPageTop";
import UserPageBot from "components/UserPages/UserPageBot";

const UserPage = ({ match, userObj, refreshUser }) => {
  const [userIdPath, setUserIdPath] = useState("");
  const [clickOn, setClickOn] = useState({
    nweet: true,
    nweetComment: false,
    media: false,
    like: false,
  });
  useEffect(() => {
    if (match.params.id) {
      const userId = match.params.id;
      setUserIdPath(userId);
    }
    console.log("유저페이지가 렌더링함");
  }, [match.params.id]);
  return (
    <div className="profile">
      <UserPageTop
        userIdPath={userIdPath}
        clickOn={clickOn}
        setClickOn={setClickOn}
        userObj={userObj}
        isMyProfile={userIdPath === userObj.uid}
        refreshUser={refreshUser}
      />
      <div className="profile_bottom">
        <UserPageBot
          userIdPath={userIdPath}
          clickOn={clickOn}
          userObj={userObj}
        />
      </div>
    </div>
  );
};
export default UserPage;
