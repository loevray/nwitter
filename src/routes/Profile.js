// import React, { useEffect, useState } from "react";
import "../css/Profile.css";
import ProfileTop from "components/Profile/ProfileTop";
import ProfileBot from "components/Profile/ProfileBot";
import { useState } from "react";

const Profile = ({ userObj, refreshUser }) => {
  const [clickOn, setClickOn] = useState({
    nweet: true,
    nweetComment: false,
    media: false,
    like: false,
  });
  // const [verified, setVeriFied] = useState(false);
  //  useEffect(() => {
  //     if(!userObj.verified){
  //         return;
  //     } else {
  //         setVeriFied(true);
  //     }
  // }, []);
  return (
    <>
      <div className="profile">
        <ProfileTop
          userObj={userObj}
          refreshUser={refreshUser}
          setClickOn={setClickOn}
          clickOn={clickOn}
        />
        <div className="profile_bottom">
          <ProfileBot userObj={userObj} clickOn={clickOn} />
        </div>
      </div>
    </>
  );
};

export default Profile;
