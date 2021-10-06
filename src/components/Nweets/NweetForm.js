import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import "./NweetForm.css";
import Nweet from "./Nweet";

const NweetForm = React.memo(
  ({ nweetObj, isOwner, userObj, followOnly, isDepthEqual }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isReNweet, setIsReNweet] = useState(false);
    const [reNweeter, setReNweeter] = useState("");
    useEffect(() => {
      const followingRef = dbService.doc(`userInfo/${userObj.uid}`);
      followingRef.get().then(async (doc) => {
        const isFollowingRef = doc.data().following;
        if (isFollowingRef.includes(nweetObj.createrId, 0)) {
          setIsFollowing(true);
        }
        if (nweetObj.reNweet.length > 0) {
          const diff = nweetObj.reNweet.filter((x) =>
            isFollowingRef.includes(x),
          );
          if (diff.length > 0) {
            setIsReNweet(true);
            const reNweeterRef = dbService.doc(`userInfo/${diff[0]}`);
            reNweeterRef.get().then((doc) => {
              const _reNweeter = doc.data().displayName;
              setReNweeter(_reNweeter);
            });
          }
        }
      });
    }, []);
    return (
      <>
        {/* 여기 아래는 팔로우 전용 */}
        {followOnly && (isFollowing || isReNweet) ? (
          <Nweet
            isReNweet={isReNweet}
            nweetObj={nweetObj}
            isOwner={isOwner}
            reNweeter={reNweeter}
            userObj={userObj}
          />
        ) : (
          //여기 아래부턴 전체공개
          !followOnly &&
          isDepthEqual && (
            <Nweet nweetObj={nweetObj} isOwner={isOwner} userObj={userObj} />
          )
        )}
      </>
    );
  },
);

export default NweetForm;
