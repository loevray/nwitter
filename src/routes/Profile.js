import { authService } from "fbase";
// import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/Profile.css"
import ProfileTop from "components/Profile/ProfileTop";
import GetMyNweets from "components/Nweets/GetMyNweets";

const Profile = ({ userObj, refreshUser }) => {
    // const [verified, setVeriFied] = useState(false); 

    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
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
            프로필_바텀
            <GetMyNweets userObj={userObj} />
            <button onClick={onLogOutClick}>Log Out</button>
        </div>
    </div>
    </>
    );
}

export default Profile;
