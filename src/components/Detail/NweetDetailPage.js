import Nweet from "components/Nweets/Nweet";
import NweetFactory from "components/Nweets/NweetFactory";
import { dbService } from "fbase";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import DetailNweet from "./DetailNweet";

const NweetDetailPage = ({ match, userObj }) => {
  const [detailNweet, setDetailNweet] = useState([]);
  const [comment, setCommnet] = useState([]);
  useEffect(() => {
    if (match.params) {
      const postId = match.params.postId;
      dbService
        .collection("nweets")
        .doc(`${postId}`)
        .onSnapshot((doc) => {
          if (!doc) {
            console.log("데이터 없음");
          }
          const detailNweet = {
            id: doc.id,
            ...doc.data(),
          };
          setDetailNweet(detailNweet);
        });
      const nweetRef = dbService.collection("nweets");
      const query = nweetRef.where("docId", "==", `${match.params.postId}`);
      query.onSnapshot((docs) => {
        const commentObj = docs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (commentObj) {
          setCommnet(commentObj);
        }
      });
    }
  }, [match]);
  return (
    <div className="home_center">
      <div className="home_center_wrapper">
        <div className="home_center_homebar_wrapper">
          <div className="home_center_homebar">
            <div className="search_bar">
              <span>트윗</span>
            </div>
          </div>
        </div>
        <DetailNweet
          detailNweet={detailNweet}
          match={match}
          userObj={userObj}
        />
        <div className="home_center_nweet_wrapper">
          <div className="home_center_nweet_profile_img">
            <img src={userObj.photoURL} alt="img" />
          </div>
          <NweetFactory
            userObj={userObj}
            depthRef={detailNweet.depth}
            docId={match.params.postId}
            commentUserId={
              detailNweet.userEmail && detailNweet.userEmail.split("@")
            }
            commentUserUid={detailNweet.createrId}
          />
        </div>
        <div className="home_center_bottom">
          {comment.length > 0 &&
            comment.map((_comment) => (
              <Nweet
                key={_comment.id}
                nweetObj={_comment}
                isOwner={_comment.createrId === userObj.uid}
                userObj={userObj}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default NweetDetailPage;
