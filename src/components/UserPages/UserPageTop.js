import { dbService, dbStore } from "fbase";
import React, { useEffect } from "react";
import { useState } from "react";

const UserPageTop = ({ userId, clickOn, setClickOn, userObj }) => {
  const [userInfo, setUserInfo] = useState();
  const [following, setFollowing] = useState(false);
  useEffect(() => {
    if (userId && userInfo === undefined) {
      const userInfoRef = dbService.collection("userInfo");
      const query = userInfoRef.doc(`${userId}`);
      query.get().then((doc) => {
        const data = doc.data();
        setUserInfo(data);
      });
    }
    const followingRef = dbService.doc(`userInfo/${userObj.uid}`);
    followingRef.get().then(async (doc) => {
      const isFollowing = doc.data().following;
      if (isFollowing.includes(userId, 0)) {
        setFollowing(true);
      }
    });
    console.log("유저페이지탑이 렌더함");
  });
  const onLikeListClick = () => {
    setClickOn((prev) => !prev);
  };
  const onFollowBtnClick = async () => {
    const followingRef = dbService.doc(`userInfo/${userObj.uid}`);
    followingRef.get().then(async (doc) => {
      const isFollowing = doc.data().following;
      if (!isFollowing.includes(userId, 0)) {
        await dbService.doc(`userInfo/${userObj.uid}`).update({
          following: dbStore.FieldValue.arrayUnion(`${userId}`),
        });
        await dbService.doc(`userInfo/${userId}`).update({
          follower: dbStore.FieldValue.arrayUnion(`${userObj.uid}`),
        });
        setFollowing(true);
        alert("팔로우 성공!");
      }
      if (following) {
        await dbService.doc(`userInfo/${userObj.uid}`).update({
          following: dbStore.FieldValue.arrayRemove(`${userId}`),
        });
        await dbService.doc(`userInfo/${userId}`).update({
          follower: dbStore.FieldValue.arrayRemove(`${userObj.uid}`),
        });
        setFollowing(false);
        alert("팔로우 해제!");
      }
    });
  };
  return (
    <>
      {userInfo ? (
        <div className="profile_top">
          <div className="profile_top_top">
            <div className="profile_img_wrapper1">
              <div className="profile_img_wrapper">
                <div className="profile_img_circle">
                  <a
                    href={userInfo.photoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="profile_image"
                      src={userInfo.photoUrl}
                      alt="profile_image"
                    />
                  </a>
                </div>
              </div>
              <div className="profile_background_img_wrapper">
                {userInfo.background ? (
                  <a
                    href={userInfo.background}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="profile_background_img"
                      src={userInfo.background}
                      alt="backImg"
                    />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
          <div className="profile_top_bottom">
            <div className="profile_edit_wrapper">
              <div className="profile_following">
                {!following ? (
                  <span
                    onClick={onFollowBtnClick}
                    className="profile_following_false"
                  >
                    팔로잉
                  </span>
                ) : (
                  <span
                    onClick={onFollowBtnClick}
                    className="profile_following_true"
                  >
                    팔로우 해제
                  </span>
                )}
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
