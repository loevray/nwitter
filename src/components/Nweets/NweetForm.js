import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import "./NweetForm.css";
import Nweet from "./Nweet";

const NweetForm = ({ nweetObj, isOwner, userObj, followOnly }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    const followingRef = dbService.doc(`userInfo/${userObj.uid}`);
    followingRef.get().then(async (doc) => {
      const isFollowingRef = doc.data().following;
      if (isFollowingRef.includes(nweetObj.createrId, 0)) {
        setIsFollowing(true);
      }
    });
  }, [nweetObj, userObj]);
  return (
    <>
      {/* 여기 아래는 팔로우 전용 */}
      {followOnly && isFollowing ? (
        <Nweet nweetObj={nweetObj} isOwner={isOwner} />
      ) : (
        //여기 아래부턴 전체공개
        !followOnly && <Nweet nweetObj={nweetObj} isOwner={isOwner} />
      )}
    </>
  );
};

export default NweetForm;
