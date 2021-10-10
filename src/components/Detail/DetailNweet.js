import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { dbService, dbStore } from "fbase";
import { ReactComponent as ReNweetBold } from "svg/reNweet_bold.svg";
import { ReactComponent as ReNweet } from "svg/reNweet_normal.svg";
import { ReactComponent as ShareLink } from "svg/shareLink.svg";
import { ReactComponent as Like } from "svg/like.svg";
import { ReactComponent as UnLiked } from "svg/unliked.svg";
import "./DetailNweet.css";
import ClipboardJS from "clipboard";

const DetailNweet = ({ detailNweet, match, userObj }) => {
  const [userId, setUserId] = useState("");
  const [isLike, setIsLike] = useState(false);
  const [isReNweeted, setIsReNweeted] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (detailNweet.like) {
      const likeRef = detailNweet.like.includes(userObj.uid);
      if (likeRef) {
        setIsLike(true);
      }
    }
    if (detailNweet.reNweet) {
      const reNweetRef = detailNweet.reNweet.includes(userObj.uid);
      if (reNweetRef) {
        setIsReNweeted(true);
      }
    }
    if (detailNweet.userEmail) {
      const emailCut = detailNweet.userEmail.split("@");
      setUserId(emailCut[0]);
    }
  }, [detailNweet]);
  const onClick = () => {
    if (match.params.id) {
      const to = match.params.id;
      history.push(`/user/${to}`);
    }
  };
  const onReNweetBtnClick = async (e) => {
    e.stopPropagation();
    if (detailNweet.reNweet.includes(userObj.uid, 0)) {
      await dbService.doc(`nweets/${detailNweet.id}`).update({
        reNweet: dbStore.FieldValue.arrayRemove(`${userObj.uid}`),
      });
      setIsReNweeted(false);
      return;
    }
    await dbService.doc(`nweets/${detailNweet.id}`).update({
      reNweet: dbStore.FieldValue.arrayUnion(`${userObj.uid}`),
    });
    setIsReNweeted(true);
  };
  const onLikeBtnClick = async (e) => {
    e.stopPropagation();
    if (detailNweet.like.includes(userObj.uid, 0)) {
      await dbService.doc(`nweets/${detailNweet.id}`).update({
        like: dbStore.FieldValue.arrayRemove(`${userObj.uid}`),
      });
      setIsLike(false);
      return;
    }
    await dbService.doc(`nweets/${detailNweet.id}`).update({
      like: dbStore.FieldValue.arrayUnion(`${userObj.uid}`),
    });
    setIsLike(true);
  };
  const onShareClick = () => {
    const clipboard = new ClipboardJS(".nweet_right_bottom_share");
    clipboard.on("success", () => {
      alert("주소 복사 완료!");
    });
  };
  return (
    <>
      <div className="detail_nweet">
        <div className="detail_nweet_top">
          <div className="detail_nweet_profile" onClick={onClick}>
            <img src={detailNweet.profile} alt="profile_img" />
          </div>
          <div className="detail_nweet_userInfo" onClick={onClick}>
            <span className="detail_nweet_nick">{detailNweet.displayName}</span>
            <span className="detail_nweet_userId">@{userId}</span>
          </div>
        </div>
        <div className="detail_nweet_bot">
          <div className="detail_nweet_content">
            <div className="detail_nweet_text">
              <span>{detailNweet.text}</span>
            </div>
            {detailNweet.hashTag && (
              <span className="detail_nweet_hashtag">
                {detailNweet.hashTag}
              </span>
            )}
            {detailNweet.attachmentUrl && (
              <div className="detail_nweet_img">
                <a
                  href={detailNweet.attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={detailNweet.attachmentUrl} alt="attach"></img>
                </a>
              </div>
            )}
            <div className="detail_nweet_createdAt">
              {detailNweet.createdAt && (
                <span>{`${detailNweet.createdAt[4]}시 ${detailNweet.createdAt[5]}분 . ${detailNweet.createdAt[1]}년 ${detailNweet.createdAt[2]}월 ${detailNweet.createdAt[3]}일`}</span>
              )}
            </div>
          </div>
          {detailNweet.like && detailNweet.like.length > 0 && (
            <div className="detail_nweet_liked">
              <span className="detail_nweet_like_length">
                {detailNweet.like.length}
              </span>
              <span className="detail_nweet_liked_text"> 마음에 들어요</span>
            </div>
          )}
          <div className="detail_nweet_btns">
            <div
              className="nweet_right_bottom_reNweet nweet_icon_menus detail"
              onClick={onReNweetBtnClick}
            >
              {isReNweeted ? <ReNweetBold /> : <ReNweet />}
            </div>
            <div
              className="nweet_right_bottom_like nweet_icon_menus detail"
              onClick={onLikeBtnClick}
            >
              {isLike ? <Like /> : <UnLiked />}
            </div>
            <div
              className="nweet_right_bottom_share nweet_icon_menus detail"
              data-clipboard-text={`loevray.github.io/nwitter/${window.location.hash}`}
              onClick={onShareClick}
            >
              <ShareLink />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailNweet;
