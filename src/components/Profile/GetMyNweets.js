import { authService, dbService, dbStore, storageService } from "fbase";
import React, { useEffect, useState } from "react";

const GetMyNweets = ({ userObj, myNweet }) => {
  const [editing, setEditing] = useState(false);
  const [userId, setUserId] = useState("");
  const [menuOn, setMenuOn] = useState(false);
  const [time, setTime] = useState("");
  const [tt, setTt] = useState(false);
  useEffect(() => {
    let now = new Date().getTime();
    let second = Math.floor((now - myNweet.createdAt[0])/1000);
    if(second>2592000) {
        setTime(`${Math.floor(second/2592000)}달 전`)
    } else if(second>604800) {
        setTime(`${Math.floor(second/604800)}주 전`)
    } else if(second>86400) {
        setTime(`${Math.floor(second/86400)}일 전`)
    } else if(second>3600) {
        setTime(`${Math.floor(second/3600)}시간 전`)
    } else if(second>60) {
        setTime(`${Math.floor(second/60)}분`)
    } else if(second === 0) {
        setTime(`따끈따끈`)
    } else if(60>=second) {
        setTime(`${second}초 전`)
    }
    const userId = myNweet.userEmail.split("@");
    setUserId(userId);
  }, [myNweet]);
  const onMenuClick = () => {
    setMenuOn(prev => !prev);
  };
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if(ok) {
      await dbService.doc(`nweets/${myNweet.id}`).delete();
      if(myNweet.attachmentUrl !== "") {
        await storageService.refFromURL(myNweet.attachmentUrl).delete();
      }
    }
  };
  const onLikeBtnClick = async () => {
    if(myNweet.reNweet.includes(authService.currentUser.uid, 0)) {
        await dbService.doc(`nweets/${myNweet.id}`).update({
        like: dbStore.FieldValue.arrayRemove(`${authService.currentUser.uid}`)
        })
        return;
    }
    await dbService.doc(`nweets/${myNweet.id}`).update({
        like: dbStore.FieldValue.arrayUnion(`${authService.currentUser.uid}`)
    })
};
const onReNweetBtnClick = async () => {
    if(myNweet.reNweet.includes(authService.currentUser.uid, 0)) {
        await dbService.doc(`nweets/${myNweet.id}`).update({
        reNweet: dbStore.FieldValue.arrayRemove(`${authService.currentUser.uid}`)
        })
        return;
    }
    await dbService.doc(`nweets/${myNweet.id}`).update({
        reNweet: dbStore.FieldValue.arrayUnion(`${authService.currentUser.uid}`)
    })
};
const onFollowBtnClick = async () => {
    const followingRef = dbService.doc(`userInfo/${userObj.uid}`);
    followingRef.get()
    .then(async (doc) => {
        const isFollowing = doc.data().following;
        if(!isFollowing.includes(myNweet.createrId, 0)){
            await dbService.doc(`userInfo/${userObj.uid}`).update({
                following: dbStore.FieldValue.arrayUnion(`${myNweet.createrId}`)
            })
            await dbService.doc(`userInfo/${myNweet.createrId}`).update({
                follower: dbStore.FieldValue.arrayUnion(`${userObj.uid}`)
            })
            alert("팔로우 성공!");
        }
        if(isFollowing.includes(myNweet.createrId, 0)){
            await dbService.doc(`userInfo/${userObj.uid}`).update({
                following: dbStore.FieldValue.arrayRemove (`${myNweet.createrId}`)
            })
            await dbService.doc(`userInfo/${myNweet.createrId}`).update({
                follower: dbStore.FieldValue.arrayRemove(`${userObj.uid}`)
            })
            alert("팔로우 해제!");
        }
    });
  };
  const toggleEditing = () => setEditing(prev => !prev);
  return(
  <div className="nweet_wrapper">
    <div className="nweet">
      <div className="nweet_left">
          <img src={myNweet.profile} alt="img" />
      </div>
      <div className="nweet_right">
        <div className="nweet_right_top">
          <div className="nweet_info">
            <span className="nweet_info_displayName">나</span>
            <span className="nweet_info_userId">{userId[0]}</span>
            <span className="block">·</span>
            <span className="nweet_info_timeAgo">{time}</span>
          </div>
          <div className="nweet_menu_wrapper">
            <button className="nweet_menu" onClick={onMenuClick}>메뉴</button>
            { menuOn && (
            <>
            <div className="nweet_drop_down">
              <div className="nweet_drop_menu" onClick={onDeleteClick}>
                <span className="nweet_delete_nweet">이 트윗 지우기</span>
              </div>
              <div className="nweet_drop_menu" onClick={toggleEditing}>
                <span className="nweet_edit_nweet">이 트윗 수정하기</span>
              </div>
            </div>
            </>
            )}
          </div>
        </div>
        <div className="nweet_right_center">
          <h4 className="nweet_content">{myNweet.text}</h4>
          {myNweet.attachmentUrl && (
            <div className="nweet_content_img_wrapper">
                <img src={myNweet.attachmentUrl} alt="img" />
            </div>
          )}
        </div>
        <div className="nweet_right_bottom">
          <div className="nweet_right_bottom_like" onClick={onLikeBtnClick}>
            <svg viewBox="0 0 24 24" 
            aria-hidden="true" >
              <g>
                <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z">
                </path>
              </g>
            </svg>
            <span>{myNweet.like.length}</span>
          </div>
          <div className="nweet_right_bottom_reNweet" onClick={onReNweetBtnClick}>
            <svg viewBox="0 0 24 24" 
            aria-hidden="true" >
              <g>
                <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z">
                </path>
              </g>
            </svg>
            <span>{myNweet.reNweet.length}</span>
          </div>
          <div className="nweet_right_bottom_follow" onClick={onFollowBtnClick}>
            <svg viewBox="0 0 20 20">
              <path d="M18.258,3.266c-0.693,0.405-1.46,0.698-2.277,0.857c-0.653-0.686-1.586-1.115-2.618-1.115c-1.98,0-3.586,1.581-3.586,3.53c0,0.276,0.031,0.545,0.092,0.805C6.888,7.195,4.245,5.79,2.476,3.654C2.167,4.176,1.99,4.781,1.99,5.429c0,1.224,0.633,2.305,1.596,2.938C2.999,8.349,2.445,8.19,1.961,7.925C1.96,7.94,1.96,7.954,1.96,7.97c0,1.71,1.237,3.138,2.877,3.462c-0.301,0.08-0.617,0.123-0.945,0.123c-0.23,0-0.456-0.021-0.674-0.062c0.456,1.402,1.781,2.422,3.35,2.451c-1.228,0.947-2.773,1.512-4.454,1.512c-0.291,0-0.575-0.016-0.855-0.049c1.588,1,3.473,1.586,5.498,1.586c6.598,0,10.205-5.379,10.205-10.045c0-0.153-0.003-0.305-0.01-0.456c0.7-0.499,1.308-1.12,1.789-1.827c-0.644,0.28-1.334,0.469-2.06,0.555C17.422,4.782,17.99,4.091,18.258,3.266">
              </path>
            </svg>
            {tt ? (
              <span>-</span>
              ) : (
              <span>+</span>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
    );
};

export default GetMyNweets;
