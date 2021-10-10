import NweetFactory from "components/Nweets/NweetFactory";
import { dbService } from "fbase";
import React, { useEffect, useRef, useState } from "react";
import "../css/Home.css";
import NweetForm from "components/Nweets/NweetForm";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  const [followMenu, setFollowMenu] = useState(false);
  const [followOnly, setFollowOnly] = useState(false);
  const followMenuWrapper = useRef();
  const topCoord = useRef();
  useEffect(() => {
    dbService
      .collection("nweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const nweetInfoObj = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (nweetInfoObj) {
          setNweets(nweetInfoObj);
        }
      });
    const followMenuOff = (event) => {
      if (!followMenuWrapper.current.contains(event.target)) {
        setFollowMenu(false);
      }
    };
    document.body.addEventListener("mousedown", followMenuOff);
    return () => {
      const unsubscribe = dbService
        .collection("nweets")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
          const nweetInfoObj = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setNweets(nweetInfoObj);
        });
      unsubscribe();
      document.body.removeEventListener("mousedown", followMenuOff);
    };
  }, []);
  const onClick = () => {
    topCoord.current.scrollIntoView(false);
  };
  const onFollowMenuClick = (e) => {
    e.stopPropagation();
    setFollowMenu(true);
  };
  const onFollowOnlyClick = () => {
    setFollowOnly((prev) => !prev);
  };
  return (
    <>
      <div className="home_center">
        <div className="home_center_wrapper">
          <div className="home_center_homebar_wrapper">
            <div className="home_center_homebar" onClick={onClick}>
              {followOnly ? <span>팔로워만</span> : <span>홈</span>}
              <span onClick={onFollowMenuClick} className="star">
                ★
              </span>
            </div>
            <div
              ref={followMenuWrapper}
              className={followMenu ? "home_center_homebar_menu" : "hidden"}
            >
              <div className="home_center_homebar_menu_top">
                {followOnly ? (
                  <span>이곳에서는 팔로우한 사람의 트윗만 보입니다.</span>
                ) : (
                  <span>홈에서는 모든 트윗이 보입니다.</span>
                )}
              </div>
              <div
                onClick={onFollowOnlyClick}
                className="home_center_homebar_menu_bottom"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="">
                  <g>
                    <path d="M21 16.25H4.81l3.22-3.22c.294-.293.294-.768 0-1.06s-.767-.294-1.06 0l-4.5 4.5c-.293.292-.293.767 0 1.06l4.5 4.5c.146.146.338.22.53.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.22-3.22H21c.414 0 .75-.337.75-.75s-.336-.75-.75-.75zM3 7.75h16.19l-3.22 3.22c-.294.293-.294.768 0 1.06.145.147.337.22.53.22s.383-.072.53-.22l4.5-4.5c.292-.292.292-.767 0-1.06l-4.5-4.5c-.294-.293-.77-.293-1.062 0s-.293.768 0 1.06l3.22 3.22H3c-.414 0-.75.336-.75.75s.336.75.75.75z"></path>
                  </g>
                </svg>
                <div className="home_center_homebar_menu_bottom_text">
                  {followOnly ? (
                    <span>모든 트윗 보기.</span>
                  ) : (
                    <span>팔로워만 보기.</span>
                  )}
                  <span className="ola">올라오는 순서대로 표시됩니다.</span>
                </div>
              </div>
            </div>
          </div>
          <div className="home_center_nweet_wrapper" ref={topCoord}>
            <div className="home_center_nweet_profile_img">
              <img src={userObj.photoURL} alt="img" />
            </div>
            <NweetFactory userObj={userObj} />
          </div>
          <div className="home_center_bottom">
            <div className="nweets">
              {/* nweets에서 받아온 배열을 map으로 분해 및 텍스트 출력. */}
              {nweets.map((a_nweet) => (
                <NweetForm
                  key={a_nweet.id}
                  nweetObj={a_nweet}
                  isOwner={a_nweet.createrId === userObj.uid}
                  userObj={userObj}
                  followOnly={followOnly}
                  isDepthEqual={a_nweet.depth === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
