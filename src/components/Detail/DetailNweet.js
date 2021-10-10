import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import "./DetailNweet.css";

const DetailNweet = ({ detailNweet, match }) => {
  const [userId, setUserId] = useState("");
  const history = useHistory();
  useEffect(() => {
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
            <span>리트</span>
            <span>좋아</span>
            <span>공유</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailNweet;
