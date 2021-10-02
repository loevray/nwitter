import Nweet from "components/Nweets/Nweet";
import { dbService } from "fbase";
import React, { useEffect } from "react";
import { useState } from "react";

const ProfileBot = ({ userObj, clickOn }) => {
  const [myNweets, setMyNweets] = useState([]);
  const [likeNweets, setLikeNweets] = useState([]);
  useEffect(() => {
    dbService
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
    return () => {
      unsubscribe();
      unsubscribe2();
    };
  }, [userObj]);
  return (
    <>
      {!clickOn ? (
        <>
          {myNweets.map((myNweet) => (
            <Nweet
              key={myNweet.id}
              nweetObj={myNweet}
              userObj={userObj}
              isOwner={myNweet.createrId === userObj.uid}
            />
          ))}
        </>
      ) : (
        <>
          {likeNweets.map((likeNweet) => (
            <Nweet
              key={likeNweet.id}
              nweetObj={likeNweet}
              userObj={userObj}
              isOwner={likeNweet.createrId === userObj.uid}
            />
          ))}
        </>
      )}
    </>
  );
};

export default ProfileBot;
