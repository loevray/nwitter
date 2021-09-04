import React, { useEffect, useRef, useState } from "react";
import EditProfile from "./EditProfile";

const ProfileTop = ({ userObj, refreshUser }) => {
    const [edit, setEdit] = useState(false);
    const editing = useRef();
    const onClick = () => {
        setEdit(true);
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if(edit && !editing.current.contains(event.target)){
                setEdit(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [edit]);
    return(
        <div className="profile_top">
            <div className="profile_top_top">
                {edit &&
                <div className="edit_profile_modal_wrapper">
                    <div className="edit_profile_modal" ref={editing}>
                        <EditProfile userObj={userObj} refreshUser={refreshUser} setEdit={setEdit}/>
                    </div>
                </div>
                }
                <div className="profile_img_wrapper1">
                    <div className="profile_img_wrapper">
                        <div className="profile_img_circle">
                            <img src={userObj.photoURL} alt="profile_image" />
                        </div>
                    </div>
                    <div className="profile_background_img">
                        프로필 배경이미지
                    </div>
                </div>
        </div>
            <div className="profile_top_bottom">
                <div className="profile_edit_wrapper">
                    <div className="profile_edit">
                        <span onClick={onClick}>프로필 수정</span>
                    </div>
                </div>
                <div className="profile_info_name">
                    <span>닉네임 : {userObj.displayName}</span>
                </div>
                <div className="profile_info_state">
                    <span>상태메세지:</span>
                </div>
                <div className="profile_info_creationtime">
                    <span>가입일 : {userObj.creationTime}</span>
                </div>
                <div className="profile_menu_bar">
                <span className="profile_menu_tweet">트윗</span> 
                <span className="profile_menu_like">마음에 들어요</span>
            </div>
        </div>
    </div>
    );
};

export default ProfileTop;