import { authService, dbService, dbStore } from "fbase";
import React, { useEffect } from "react";
import { useState } from "react";

const LikeNweet = ({ likeNweet, userObj }) => {
  const [userId, setUserId] = useState("");
  const [menuOn, setMenuOn] = useState(false);
  const [time, setTime] = useState("");
  const [tt, setTt] = useState(false);
  const [isHash, setIsHash] = useState(false);
  useEffect(() => {
    let now = new Date().getTime();
    let second = Math.floor((now - likeNweet.createdAt[0]) / 1000);
    if (second > 2592000) {
      setTime(`${Math.floor(second / 2592000)}달 전`);
    } else if (second > 604800) {
      setTime(`${Math.floor(second / 604800)}주 전`);
    } else if (second > 86400) {
      setTime(`${Math.floor(second / 86400)}일 전`);
    } else if (second > 3600) {
      setTime(`${Math.floor(second / 3600)}시간 전`);
    } else if (second > 60) {
      setTime(`${Math.floor(second / 60)}분`);
    } else if (second === 0) {
      setTime(`따끈따끈`);
    } else if (60 >= second) {
      setTime(`${second}초 전`);
    }
    const userId = likeNweet.userEmail.split("@");
    setUserId(userId);
    const followingRef = dbService.doc(`userInfo/${userObj.uid}`);
    followingRef.get().then(async (doc) => {
      const isFollowing = doc.data().following;
      if (isFollowing.includes(likeNweet.createrId, 0)) {
        setTt(true);
      }
    });
    if (likeNweet.hashTag != null) {
      setIsHash(true);
    }
  }, [likeNweet, userObj]);
  const onLikeBtnClick = async () => {
    if (likeNweet.reNweet.includes(authService.currentUser.uid, 0)) {
      await dbService.doc(`nweets/${likeNweet.id}`).update({
        like: dbStore.FieldValue.arrayRemove(`${authService.currentUser.uid}`),
      });
      return;
    }
    await dbService.doc(`nweets/${likeNweet.id}`).update({
      like: dbStore.FieldValue.arrayUnion(`${authService.currentUser.uid}`),
    });
  };
  const onReNweetBtnClick = async () => {
    if (likeNweet.reNweet.includes(authService.currentUser.uid, 0)) {
      await dbService.doc(`nweets/${likeNweet.id}`).update({
        reNweet: dbStore.FieldValue.arrayRemove(
          `${authService.currentUser.uid}`,
        ),
      });
      return;
    }
    await dbService.doc(`nweets/${likeNweet.id}`).update({
      reNweet: dbStore.FieldValue.arrayUnion(`${authService.currentUser.uid}`),
    });
  };
  const onFollowBtnClick = async () => {
    const followingRef = dbService.doc(`userInfo/${userObj.uid}`);
    followingRef.get().then(async (doc) => {
      const isFollowing = doc.data().following;
      if (!isFollowing.includes(likeNweet.createrId, 0)) {
        await dbService.doc(`userInfo/${userObj.uid}`).update({
          following: dbStore.FieldValue.arrayUnion(`${likeNweet.createrId}`),
        });
        await dbService.doc(`userInfo/${likeNweet.createrId}`).update({
          follower: dbStore.FieldValue.arrayUnion(`${userObj.uid}`),
        });
        alert("팔로우 성공!");
      }
      if (isFollowing.includes(likeNweet.createrId, 0)) {
        await dbService.doc(`userInfo/${userObj.uid}`).update({
          following: dbStore.FieldValue.arrayRemove(`${likeNweet.createrId}`),
        });
        await dbService.doc(`userInfo/${likeNweet.createrId}`).update({
          follower: dbStore.FieldValue.arrayRemove(`${userObj.uid}`),
        });
        alert("팔로우 해제!");
      }
    });
  };
  const onMenuClick = () => {
    setMenuOn((prev) => !prev);
  };
  return (
    <div className="nweet_wrapper">
      <div className="nweet">
        <div className="nweet_left">
          <img src={likeNweet.profile} alt="img" />
        </div>
        <div className="nweet_right">
          <div className="nweet_right_top">
            <div className="nweet_info">
              <span className="nweet_info_displayName">
                {likeNweet.displayName}
              </span>
              <span className="nweet_info_userId">{userId[0]}</span>
              <span className="block">·</span>
              <span className="nweet_info_timeAgo">{time}</span>
            </div>
            <div className="nweet_menu_wrapper">
              <span className="nweet_menu" onClick={onMenuClick}>
                •••
              </span>
              {menuOn && <button>이 유저에게 관심없음</button>}
            </div>
          </div>
          <div className="nweet_right_center">
            <h4 className="nweet_content">{likeNweet.text}</h4>
            {isHash && (
              <span className="nweet_hashtag">{likeNweet.hashTag}</span>
            )}
            {likeNweet.attachmentUrl && (
              <div className="nweet_content_img_wrapper">
                <a href={likeNweet.attachmentUrl} target="_blank">
                  <img src={likeNweet.attachmentUrl} alt="img" />
                </a>
              </div>
            )}
          </div>
          <div className="nweet_right_bottom">
            <div className="nweet_right_bottom_like" onClick={onLikeBtnClick}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
                </g>
              </svg>
              <span>{likeNweet.like.length}</span>
            </div>
            <div
              className="nweet_right_bottom_reNweet"
              onClick={onReNweetBtnClick}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path>
                </g>
              </svg>
              <span>{likeNweet.reNweet.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikeNweet;
