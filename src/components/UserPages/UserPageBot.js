import Nweet from "components/Nweets/Nweet";
import { dbService } from "fbase";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const UserPageBot = ({ clickOn, userIdPath, userObj }) => {
  const [userNweets, setUserNweets] = useState([]);
  const [userNweetsComment, setUserNweetsComment] = useState([]);
  const [mediaNweets, setMeidaNweets] = useState([]);
  const [likeNweets, setLikeNweets] = useState([]);
  const [data, setData] = useState(false);
  useEffect(() => {
    //트윗db
    dbService
      .collection("nweets")
      .where("createrId", "==", userIdPath)
      .where("docId", "==", false)
      .orderBy("createdAt", "desc")
      .limit(5)
      .onSnapshot((snapshot) => {
        const nweetsMap = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserNweets(nweetsMap);
      });
    //트윗 및 답글db
    dbService
      .collection("nweets")
      .where("createrId", "==", userIdPath)
      .orderBy("createdAt", "desc")
      .limit(5)
      .onSnapshot((snapshot) => {
        if (snapshot) {
          const nweetsMap = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUserNweetsComment(nweetsMap);
          if (!data) {
            setData(true);
          }
        }
      });
    //미디어 db
    dbService
      .collection("nweets")
      .where("createrId", "==", userIdPath)
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
    //마음에 들어요 db
    dbService
      .collection("nweets")
      .where("like", "array-contains", userIdPath)
      .orderBy("createdAt", "desc")
      .limit(5)
      .onSnapshot((snapshot) => {
        const nweetsMap = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLikeNweets(nweetsMap);
      });
  }, [data]);
  return (
    <>
      {data ? (
        <>
          {clickOn.nweet &&
            userNweets.map((_userNweet) => (
              <Nweet
                key={_userNweet.id}
                nweetObj={_userNweet}
                userObj={userObj}
                isOwner={_userNweet.createrId === userObj.uid}
              />
            ))}

          {clickOn.nweetComment &&
            userNweetsComment.map((_userNweetsComment) => (
              <Nweet
                key={_userNweetsComment.id}
                nweetObj={_userNweetsComment}
                userObj={userObj}
                isOwner={_userNweetsComment.createrId === userObj.uid}
              />
            ))}

          {clickOn.media &&
            mediaNweets.map((_mediaNweets) => (
              <Nweet
                key={_mediaNweets.id}
                nweetObj={_mediaNweets}
                userObj={userObj}
                isOwner={_mediaNweets.createrId === userObj.uid}
              />
            ))}

          {clickOn.like &&
            likeNweets.map((_likeNweet) => (
              <Nweet
                key={_likeNweet.id}
                nweetObj={_likeNweet}
                userObj={userObj}
                isOwner={_likeNweet.createrId === userObj.uid}
              />
            ))}
        </>
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
};

export default UserPageBot;
