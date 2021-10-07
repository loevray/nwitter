import Nweet from "components/Nweets/Nweet";
import { dbService } from "fbase";
import React, { useEffect } from "react";
import { useState } from "react";

const ProfileBot = ({ userObj, clickOn }) => {
  const [myNweets, setMyNweets] = useState([]);
  const [myNweetsAndComment, setMyNweetsAndComment] = useState([]);
  const [mediaNweets, setMeidaNweets] = useState([]);
  const [likeNweets, setLikeNweets] = useState([]);
  useEffect(() => {
    dbService
      .collection("nweets")
      .where("createrId", "==", userObj.uid)
      .where("docId", "==", false)
      .orderBy("createdAt", "desc")
      .limit(5)
      .onSnapshot((snapshot) => {
        const nweetsMap = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("트윗만", nweetsMap);
        setMyNweets(nweetsMap);
      });
    dbService
      .collection("nweets")
      .where("createrId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .limit(10)
      .onSnapshot((snapshot) => {
        const nweetsMap = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("트윗 및 답글까지", nweetsMap);
        setMyNweetsAndComment(nweetsMap);
      });
    dbService
      .collection("nweets")
      .where("like", "array-contains", userObj.uid)
      .orderBy("createdAt", "desc")
      .limit(5)
      .onSnapshot((snapshot) => {
        const nweetsMap = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLikeNweets(nweetsMap);
      });
    dbService
      .collection("nweets")
      .where("attachmentUrl", "!=", "")
      .orderBy("attachmentUrl", "desc")
      .orderBy("createdAt", "desc")
      .limit(5)
      .onSnapshot((snapshot) => {
        const nweetsMap = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMeidaNweets(nweetsMap);
      });
    const unsubscribe = dbService
      .collection("nweets")
      .where("createrId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .limit(5)
      .onSnapshot((snapshot) => {
        const nweetsMap = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMyNweets(nweetsMap);
      });
    const unsubscribe2 = dbService
      .collection("nweets")
      .where("like", "array-contains", userObj.uid)
      .orderBy("createdAt", "desc")
      .limit(5)
      .onSnapshot((snapshot) => {
        const nweetsMap = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLikeNweets(nweetsMap);
      });
    const unsubscribe3 = dbService
      .collection("nweets")
      .where("createrId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .limit(10)
      .onSnapshot((snapshot) => {
        const nweetsMap = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMyNweetsAndComment(nweetsMap);
      });
    return () => {
      unsubscribe();
      unsubscribe2();
      unsubscribe3();
    };
  }, [userObj]);
  return (
    <>
      {clickOn.nweet &&
        myNweets.map((myNweet) => (
          <Nweet
            key={myNweet.id}
            nweetObj={myNweet}
            userObj={userObj}
            isOwner={myNweet.createrId === userObj.uid}
          />
        ))}

      {clickOn.nweetComment &&
        myNweetsAndComment.map((myNweetComment) => (
          <Nweet
            key={myNweetComment.id}
            nweetObj={myNweetComment}
            userObj={userObj}
            isOwner={myNweetComment.createrId === userObj.uid}
          />
        ))}

      {clickOn.media &&
        mediaNweets.map((mediaNweets) => (
          <Nweet
            key={mediaNweets.id}
            nweetObj={mediaNweets}
            userObj={userObj}
            isOwner={mediaNweets.createrId === userObj.uid}
          />
        ))}

      {clickOn.like &&
        likeNweets.map((likeNweet) => (
          <Nweet
            key={likeNweet.id}
            nweetObj={likeNweet}
            userObj={userObj}
            isOwner={likeNweet.createrId === userObj.uid}
          />
        ))}
    </>
  );
};

export default ProfileBot;
