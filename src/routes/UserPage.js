import React, { useEffect } from "react";
import { useState } from "react";
import "./UserPage.css";
import "../css/Profile.css";
import UserPageTop from "components/UserPages/UserPageTop";
import UserPageBot from "components/UserPages/UserPageBot";

const UserPage = ({ match, userObj, refreshUser }) => {
  const [userIdPath, setUserIdPath] = useState("");
  console.log("유저페이지 렌더링 됨");
  useEffect(() => {
    if (match.params.id) {
      const userId = match.params.id;
      setUserIdPath(userId);
    }
  }, [match.params.id]);
  return (
    <div className="profile">
      <UserPageTop
        userIdPath={userIdPath}
        userObj={userObj}
        isMyProfile={userIdPath === userObj.userId}
        refreshUser={refreshUser}
      />
      <div className="profile_bottom">
        <UserPageBot userIdPath={userIdPath} userObj={userObj} />
      </div>
    </div>
  );
};
export default UserPage;
