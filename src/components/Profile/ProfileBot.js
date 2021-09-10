import { dbService } from "fbase";
import React, { useEffect } from "react";
import { useState } from "react";
import GetMyNweets from "./GetMyNweets";
import LikeNweet from "./LikeNweet";

const ProfileBot = ({ userObj, clickOn }) => {
  const [myNweets, setMyNweets] = useState([]);
  const [likeNweets, setLikeNweets] = useState([]);
  useEffect(() => {
  dbService.collection("nweets").where("createrId", "==", userObj.uid)
  .orderBy("createdAt","desc")
  .limit(5)
  .onSnapshot((snapshot) => {
    const nweetsMap = snapshot.docs.map((doc) => ({
      id:doc.id,
      ...doc.data()
    }));
    setMyNweets(nweetsMap);
  });
  dbService.collection("nweets").where("like", "array-contains", userObj.uid)
  .orderBy("createdAt","desc")
  .limit(5)
  .onSnapshot((snapshot) => {
    const nweetsMap = snapshot.docs.map((doc) => ({
      id:doc.id,
      ...doc.data()
    }));
    setLikeNweets(nweetsMap);
  });
}, [userObj]);
  return (
    <>
    {!clickOn ? 
    <>
    {myNweets.map((myNweet) => (
      <GetMyNweets 
      key={myNweet.id}
      myNweet={myNweet}
      userObj={userObj}
      />
    ))} 
    </>
    : 
    <>
    {likeNweets.map((likeNweet) => (
      <LikeNweet 
      key={likeNweet.id}
      likeNweet={likeNweet}
      userObj={userObj}
      />
    ))}
    </>
    }
    </>
  );
};

export default ProfileBot;