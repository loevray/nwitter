import Nweet from "components/Nweets/Nweet";
import { dbService } from "fbase";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const UserPageBot = ({ userIdPath, userObj }) => {
  const [userNweets, setUserNweets] = useState([]);
  const [userNweetsComment, setUserNweetsComment] = useState([]);
  const [mediaNweets, setMeidaNweets] = useState([]);
  const [likeNweets, setLikeNweets] = useState([]);
  const [clickOn, setClickOn] = useState({
    nweet: true,
    nweetComment: false,
    media: false,
    like: false,
  });
  const [data, setData] = useState(false);
  useEffect(() => {
    if (userIdPath) {
      //트윗db
      dbService
        .collection("nweets")
        .where("userId", "==", userIdPath)
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
        .where("userId", "==", userIdPath)
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
        .where("userId", "==", userIdPath)
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
    }
    return () => {
      const unsub1 = dbService //트윗db
        .collection("nweets")
        .where("userId", "==", userIdPath)
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
      const unsub2 = dbService
        .collection("nweets")
        .where("userId", "==", userIdPath)
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
      const unsub3 = dbService
        .collection("nweets")
        .where("userId", "==", userIdPath)
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
      const unsub4 = dbService
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
      unsub1();
      unsub2();
      unsub3();
      unsub4();
      setClickOn((prevState) => ({
        ...prevState,
      }));
    };
  }, [data, userIdPath]);
  const onMenuListClick = (e) => {
    switch (e.target.innerText) {
      case "트윗":
        setClickOn({
          nweet: true,
          nweetComment: false,
          media: false,
          like: false,
        });
        break;
      case "트윗 및 답글":
        setClickOn({
          nweet: false,
          nweetComment: true,
          media: false,
          like: false,
        });
        break;
      case "미디어":
        setClickOn({
          nweet: false,
          nweetComment: false,
          media: true,
          like: false,
        });
        break;
      case "마음에 들어요":
        setClickOn({
          nweet: false,
          nweetComment: false,
          media: false,
          like: true,
        });
        break;
      default:
        setClickOn({
          nweet: true,
          nweetComment: false,
          media: false,
          like: false,
        });
    }
  };
  return (
    <>
      <div onClick={onMenuListClick} className="profile_menu_bar">
        <span className={clickOn.nweet ? "click_on" : "click_off"}>트윗</span>
        <span className={clickOn.nweetComment ? "click_on" : "click_off"}>
          트윗 및 답글
        </span>
        <span className={clickOn.media ? "click_on" : "click_off"}>미디어</span>
        <span className={clickOn.like ? "click_on" : "click_off"}>
          마음에 들어요
        </span>
      </div>
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
