import { dbService } from "fbase";
import React, { useEffect } from "react";
import { useState } from "react";

const UserPageTop = ({ userId, clickOn, setClickOn }) => {
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    if (userId && userInfo === undefined) {
      const userInfoRef = dbService.collection("userInfo");
      const query = userInfoRef.doc(`${userId}`);
      query.get().then((doc) => {
        const data = doc.data();
        setUserInfo(data);
      });
    }
    console.log("유저페이지탑이 렌더함");
    return () => {
      setClickOn(false);
    };
  });
  const onLikeListClick = () => {
    setClickOn((prev) => !prev);
  };
  const onClick = () => {
    console.log("팔로우하기 눌름");
  };
  return (
    <>
      {userInfo ? (
        <div className="profile_top">
          <div className="profile_top_top">
            <div className="profile_img_wrapper1">
              <div className="profile_img_wrapper">
                <div className="profile_img_circle">
                  <img src={userInfo.photoUrl} alt="profile_image" />
                </div>
              </div>
              <div className="profile_background_img">
                {userInfo.background ? (
                  <img src={userInfo.background} alt="backImg" />
                ) : null}
              </div>
            </div>
          </div>
          <div className="profile_top_bottom">
            <div className="profile_edit_wrapper">
              <div className="profile_edit">
                <span onClick={onClick}>팔로잉</span>
              </div>
            </div>
            <div className="profile_info_name">
              <span>{userInfo.displayName}</span>
            </div>
            <div className="profile_info_state">
              <span>상태메세지:{userInfo.stateMsg}</span>
            </div>
            <div className="profile_info_following_wrapper">
              <span className="profile_info_follow_number">
                {userInfo.following.length}
              </span>
              <span className="profile_info_follow">팔로우중</span>
              <span className="profile_info_follow_number">
                {userInfo.follower.length}
              </span>
              <span>팔로워</span>
            </div>
            <div onClick={onLikeListClick} className="profile_menu_bar">
              <span className={!clickOn ? "click_on" : "click_off"}>트윗</span>
              <span className={clickOn ? "click_on" : "click_off"}>
                마음에 들어요
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UserPageTop;
