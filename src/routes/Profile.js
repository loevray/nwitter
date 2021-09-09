import { authService } from "fbase";
// import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/Profile.css"
import ProfileTop from "components/Profile/ProfileTop";
import ProfileBot from "components/Profile/ProfileBot";

const Profile = ({ userObj, refreshUser }) => {
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
        <ProfileTop userObj={userObj} refreshUser={refreshUser}/>
        <div className="profile_bottom">
            <ProfileBot userObj={userObj}/>
        </div>
    </div>
    </>
    );
}

export default Profile;
