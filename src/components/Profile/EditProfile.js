import React, { useState } from "react";
import "./EditProfile.css"
import { dbService, storageService } from "fbase";

const EditProfile = ({ userObj, refreshUser, setEdit }) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const [profileImg, setProfileImg] = useState("");
    const onNickNameChange = (event) =>{
        const {target: {value}} = event;
        setNewDisplayName(value);
    }
    const onNickNameSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName,
            })
            refreshUser();
        }
    };
    const onProfileImgSubmit = async (event) => {
        event.preventDefault();
        let imgUrl = "";
        if(profileImg !== ""){
            const imgRef = storageService.ref().child(`${userObj.uid}/profile_img/1`);
            const response = await imgRef.putString(profileImg, "data_url");
            imgUrl = await response.ref.getDownloadURL();
            const userRef = dbService.collection("nweets");
            const query = userRef.where("createrId", "==", `${userObj.uid}`);
            query.get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    userRef.doc(doc.id).update({
                    profile: imgUrl
                    })
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        }
        const userSetObj = {
            profileImg: imgUrl,
            backgroundImg: "editProfile"
        };
        await dbService.collection("userInfo").doc(userObj.uid).set(userSetObj);
        await userObj.updateProfile({
            photoURL: imgUrl
        })
        setProfileImg("");
        refreshUser();
    };
    const onProfileImgChange = (event) => {
        const {target:{files}} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget:{result}} = finishedEvent;
            setProfileImg(result);
        };
        if(theFile){
            reader.readAsDataURL(theFile);
        }
    };
    const onProfileCloseClick = () => {
        setEdit(false);
    }
    const onProfileSaveClick = () => {
        console.log("i'm save btn");
        setEdit(false);
    }
    return(
        <>
        <div className="edit_profile_menu_wrapper">
            <button onClick={onProfileCloseClick}> 닫기 </button>
            <button onClick={onProfileSaveClick}> 저장 </button>
        </div>
        <div className="edit_profile_content">
            <div className="edit_profile_top_wrapper">
                <div className="update_profile_img_wrapper">
                    <form onSubmit={onProfileImgSubmit}>
                        <input
                        className="update_profile_img"
                        type="file"
                        accept="image/*" 
                        onChange={onProfileImgChange}
                        />
                        <input
                        type="submit"
                        value="update profile img"
                        />
{/*                         <input
                        className="update_background_img"
                        type="file"
                        accept="image/*" 
                        /> */}
                    </form>
                </div>
            </div>
            <div className="edit_profile_bottom_wrapper">
                <div className="update_nickname_wrapper">
                    <form onSubmit={onNickNameSubmit} >
                        <input onChange={onNickNameChange} type="text" value={newDisplayName} placeholder="이름" />
                        <input type="submit" value="Update Profile" />
                    </form>
                </div>
                <img src={userObj.photoURL} alt="profileimg"/>
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
                ㅇ
                <br />
            </div>
        </div>
        </>
    );
};

export default EditProfile;