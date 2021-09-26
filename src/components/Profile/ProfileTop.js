import { dbService } from "fbase";
import React, { useEffect, useRef, useState } from "react";
import EditProfile from "./EditProfile";

const ProfileTop = ({ userObj, refreshUser, clickOn, setClickOn }) => {
  const [edit, setEdit] = useState(false);
  const [backImg, setBackImg] = useState("");
  const [stateMessage, setStateMessage] = useState("");
  const editing = useRef();
  const onClick = () => {
    setEdit(true);
  };
  const onLikeListClick = () => {
    setClickOn((prev) => !prev);
  };
  useEffect(() => {
    dbService
      .collection("userInfo")
      .doc(`${userObj.uid}`)
      .onSnapshot((snapshot) => {
        const { background, stateMsg } = snapshot.data();
        if (background) {
          setBackImg(background);
        }
        if (stateMsg) {
          setStateMessage(stateMsg);
        }
      });
    const handleClickOutside = (event) => {
      if (edit && !editing.current.contains(event.target)) {
        setEdit(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [edit, userObj]);
  return (
    <div className="profile_top">
      <div className="profile_top_top">
        {edit && (
          <div className="edit_profile_modal_wrapper">
            <div className="edit_profile_modal" ref={editing}>
              <EditProfile
                userObj={userObj}
                refreshUser={refreshUser}
                setEdit={setEdit}
                stateMessage={stateMessage}
              />
            </div>
          </div>
        )}
        <div className="profile_img_wrapper1">
          <div className="profile_img_wrapper">
            <div className="profile_img_circle">
              <a
                href={userObj.photoURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="profile_image"
                  src={userObj.photoURL}
                  alt="profile_image"
                />
              </a>
            </div>
          </div>
          <div className="profile_background_img_wrapper">
            <a href={backImg} target="_blank" rel="noopener noreferrer">
              {backImg ? (
                <img
                  className="profile_background_img"
                  src={backImg}
                  alt="backImg"
                />
              ) : null}
            </a>
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
          <span>{userObj.displayName}</span>
        </div>
        <div className="profile_info_state">
          <span>{stateMessage}</span>
        </div>
        <div className="profile_info_creationtime">
          <span>{userObj.creationTime}</span>
        </div>
        <div onClick={onLikeListClick} className="profile_menu_bar">
          <span className={!clickOn ? "click_on" : "click_off"}>
            내가 한 트윗
          </span>
          <span className={clickOn ? "click_on" : "click_off"}>
            마음에 들어요
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileTop;
