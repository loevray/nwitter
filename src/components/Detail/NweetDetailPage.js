import NweetFactory from "components/Nweets/NweetFactory";
import { dbService } from "fbase";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import DetailNweet from "./DetailNweet";

const NweetDetailPage = ({ match, userObj }) => {
  const [detailNweet, setDetailNweet] = useState([]);
  useEffect(() => {
    if (match.params) {
      const postId = match.params.postId;
      dbService
        .collection("nweets")
        .doc(`${postId}`)
        .get()
        .then((doc) => {
          if (doc) {
            const detailNweet = doc.data();
            setDetailNweet(detailNweet);
          }
        });
    }
  }, []);
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
        <DetailNweet detailNweet={detailNweet} />
        <div className="home_center_nweet_wrapper">
          <div className="home_center_nweet_profile_img">
            <img src={userObj.photoURL} alt="img" />
          </div>
          <NweetFactory userObj={userObj} />
        </div>
      </div>
    </div>
  );
};

export default NweetDetailPage;
