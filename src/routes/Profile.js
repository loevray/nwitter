import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
    // const [myNweets, setMyNweets] = useState("");
    // const [verified, setVeriFied] = useState(false);
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
/*     const getMyNweets = async() => {
        const nweets = await dbService.collection("nweets").where("createrId", "==", userObj.uid).orderBy("createdAt","desc").get();
        const nweetsMap = nweets.docs.map((doc) => doc.data().text);
        setMyNweets(nweetsMap);
    }*/
/*     useEffect(() => {
        if(!userObj.verified){
            return;
        } else {
            setVeriFied(true);
        }
    }, []);  */
    const onChange = (event) =>{
        const {target: {value}} = event;
        setNewDisplayName(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName,
            })
            refreshUser();
        }
    };
    return (
    <>
    <form onSubmit={onSubmit} >
        <input onChange={onChange} type="text" value={newDisplayName} placeholder="display name" />
        <input type="submit" value="Update Profile" />
    </form>
        <button onClick={onLogOutClick}>Log Out</button>
    </>
    );
}

export default Profile;
