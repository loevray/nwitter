import { dbService } from "fbase";
import React, { useEffect } from "react";
import { useState } from "react";
import GetMyNweets from "./GetMyNweets";

const ProfileBot = ({ userObj }) => {
  const [myNweets, setMyNweets] = useState([]);
  useEffect(() => {
  dbService.collection("nweets").where("createrId", "==", userObj.uid)
  .orderBy("createdAt","desc")
  .onSnapshot((snapshot) => {
    const nweetsMap = snapshot.docs.map((doc) => ({
      id:doc.id,
      ...doc.data()
    }));
    setMyNweets(nweetsMap);
  });
}, []);
  return (
    <>
    {myNweets.map((myNweet) => (
      <GetMyNweets 
      key={myNweet.id}
      myNweet={myNweet}
      userObj={userObj}
      />
    ))}
    </>
  );
};

export default ProfileBot;