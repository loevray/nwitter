import Nweet from "components/Nweets/Nweet";
import { dbService } from "fbase";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import GetUserLikeNweets from "./GetUserLikeNweets";

const UserPageBot = ({ clickOn, userId, userObj }) => {
  const [strangerNweets, setStrangerNweets] = useState([]);
  const [strangerLikeNweets, setStrangerLikeNweets] = useState([]);
  useEffect(() => {
    if (userId) {
      dbService
        .collection("nweets")
        .where("createrId", "==", userId)
        .orderBy("createdAt", "desc")
        .limit(5)
        .onSnapshot((snapshot) => {
          const nweetsMap = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setStrangerNweets(nweetsMap);
        });
    }
  });
  return (
    <>
      {!clickOn ? (
        <>
          {strangerNweets.map((strangerNweet) => (
            <Nweet
              key={strangerNweet.id}
              nweetObj={strangerNweet}
              isOwner={strangerNweet.createrId === userObj.uid}
              userObj={userObj}
            />
          ))}
        </>
      ) : (
        <>
          {/*           {strangerLikeNweets.map((strangerLikeNweet) => (
            <GetUserLikeNweets
              key={strangerLikeNweet.id}
              strangerLikeNweet={strangerLikeNweet}
              userId={userId}
            />
          ))} */}
        </>
      )}
    </>
  );
};

export default UserPageBot;
