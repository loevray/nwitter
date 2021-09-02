import React, { useState } from "react";
import "./EditProfile.css"

const EditProfile = ({ userObj, refreshUser, setEdit }) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const [profileImg, setProfileImg] = useState("");
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
    const onFileChange = (event) => { 
        const {target:{files}} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget:{result}} = finishedEvent;
            setProfileImg(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onClickClose = () => {
        setEdit(false);
    }
    const onClickSave = () => {
        console.log("i'm save btn");
        setEdit(false);
    }
    return(
        <>
        <div className="edit_profile_menu_wrapper">
            <button onClick={onClickClose}> 닫기 </button>
            <button onClick={onClickSave}> 저장 </button>
        </div>
        <div className="edit_profile_content">
            <div className="edit_profile_top_wrapper">
                <div className="edit_profile_top_backgroundImg">
                    배경이미지
                </div>
                <div className="edit_profile_top_img">
                    프로필이미지
                </div>
            </div>
            <div className="edit_profile_bottom_wrapper">
                <div className="update_nickname_wrapper">
                    <form onSubmit={onSubmit} >
                    <input
                    id="inputt"
                    className="update_profile_img"
                    type="file"
                    accept="image/*" 
                    onChange={onFileChange}
                    />
                        <input onChange={onChange} type="text" value={newDisplayName} placeholder="이름" />
                        <input type="submit" value="Update Profile" />
                    </form>
                </div>
                <div className="update_profile_img_wrapper">
                </div>
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