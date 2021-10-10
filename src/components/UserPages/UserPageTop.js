import EditProfile from "components/EditProfile";
import { dbService, dbStore } from "fbase";
import React, { useEffect, useRef } from "react";
import { useState } from "react";

const UserPageTop = ({ userIdPath, userObj, isMyProfile, refreshUser }) => {
  const [userInfo, setUserInfo] = useState();
  const [following, setFollowing] = useState(false);
  const [edit, setEdit] = useState(false);
  const editing = useRef();
  useEffect(() => {
    if (userIdPath) {
      const userInfoRef = dbService.collection("userInfo");
      const query = userInfoRef.doc(`${userIdPath}`);
      query.onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setUserInfo(data);
        }
      });
    }
    const followingRef = dbService.doc(`userInfo/${userObj.uid}`);
    followingRef.get().then(async (doc) => {
      const isFollowing = doc.data().following;
      if (isFollowing.includes(userIdPath, 0)) {
        setFollowing(true);
      }
    });
  }, [userIdPath]);
  const onProfileUpdateClick = () => {
    setEdit(true);
  };
  const onFollowBtnClick = async () => {
    const followingRef = dbService.doc(`userInfo/${userObj.uid}`);
    followingRef.get().then(async (doc) => {
      const isFollowing = doc.data().following;
      if (!isFollowing.includes(userIdPath, 0)) {
        await dbService.doc(`userInfo/${userObj.uid}`).update({
          following: dbStore.FieldValue.arrayUnion(`${userIdPath}`),
        });
        await dbService.doc(`userInfo/${userIdPath}`).update({
          follower: dbStore.FieldValue.arrayUnion(`${userObj.uid}`),
        });
        setFollowing(true);
        alert("팔로우 성공!");
      }
      if (following) {
        await dbService.doc(`userInfo/${userObj.uid}`).update({
          following: dbStore.FieldValue.arrayRemove(`${userIdPath}`),
        });
        await dbService.doc(`userInfo/${userIdPath}`).update({
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
            {edit && (
              <div className="edit_profile_modal_wrapper">
                <div className="edit_profile_modal" ref={editing}>
                  <EditProfile
                    userObj={userObj}
                    refreshUser={refreshUser}
                    setEdit={setEdit}
                    stateMessage={userInfo.stateMsg && userInfo.stateMsg}
                  />
                </div>
              </div>
            )}
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
              {isMyProfile ? (
                <div className="profile_edit">
                  <span onClick={onProfileUpdateClick}>프로필 수정</span>
                </div>
              ) : (
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
              )}
            </div>
            <div className="profile_info_name">
              <span className="profile_info_nickname">
                {userInfo.displayName}
              </span>
              {userInfo.email && (
                <span className="profile_info_id">
                  @{userInfo.email.split("@")[0]}
                </span>
              )}
            </div>
            <div className="profile_info_state">
              <span>{userInfo.stateMsg}</span>
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
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UserPageTop;
