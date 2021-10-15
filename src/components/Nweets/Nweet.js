import React, { memo, useEffect, useRef, useState } from "react";
import { authService, dbService, dbStore, storageService } from "fbase";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { ReactComponent as CommentWhite } from "svg/comment_white.svg";
import { ReactComponent as ReNweetBold } from "svg/reNweet_bold.svg";
import { ReactComponent as ReNweet } from "svg/reNweet_normal.svg";
import { ReactComponent as Like } from "svg/like.svg";
import { ReactComponent as UnLiked } from "svg/unliked.svg";
import { ReactComponent as ShareLink } from "svg/shareLink.svg";
import DropMenu from "components/DropMenu/DropMenu";

const Nweet = memo(
  ({ isReNweet, nweetObj, isOwner, reNweeter, userObj, setCopyed }) => {
    const [menuOn, setMenuOn] = useState({
      kebab: false,
      share: false,
    });
    const [isLike, setIsLike] = useState(false);
    const [isReNweeted, setIsReNweeted] = useState(false);
    const [userId, setUserId] = useState("");
    const [postTime, setPostTime] = useState("");
    const [commentSize, setCommentSize] = useState(0);
    const timeout = useRef(null);
    const history = useHistory();
    useEffect(() => {
      const commentRef = dbService
        .collection("nweets")
        .where("docId", "==", `${nweetObj.id}`);
      commentRef.onSnapshot((doc) => {
        const snap = doc.size;
        if (snap > 0) {
          setCommentSize(snap);
        }
      });
      const likeRef = nweetObj.like.includes(userObj.uid);
      if (likeRef) {
        setIsLike(true);
      }
      const reNweetRef = nweetObj.reNweet.includes(userObj.uid);
      if (reNweetRef) {
        setIsReNweeted(true);
      }
      let now = new Date().getTime();
      let second = Math.floor((now - nweetObj.createdAt[0]) / 1000);
      if (second > 2592000) {
        setPostTime(`${Math.floor(second / 2592000)}달 전`);
      } else if (second > 604800) {
        setPostTime(`${Math.floor(second / 604800)}주 전`);
      } else if (second > 86400) {
        setPostTime(`${Math.floor(second / 86400)}일 전`);
      } else if (second > 3600) {
        setPostTime(`${Math.floor(second / 3600)}시간 전`);
      } else if (second > 60) {
        setPostTime(`${Math.floor(second / 60)}분`);
      } else if (second === 0) {
        setPostTime(`따끈따끈`);
      } else if (60 >= second) {
        setPostTime(`${second}초 전`);
      }
      const userIdCut = nweetObj.userEmail.split("@");
      if (!userId) {
        setUserId(userIdCut);
      }
    }, []);
    const onDeleteClick = async (e) => {
      e.stopPropagation();
      const ok = window.confirm("정말 삭제하시겠습니까?(복구할 수 없습니다.)");
      if (ok) {
        await dbService.doc(`nweets/${nweetObj.id}`).delete();
        if (nweetObj.attachmentUrl !== "") {
          await storageService.refFromURL(nweetObj.attachmentUrl).delete();
        }
      }
    };
    const onLikeBtnClick = async (e) => {
      e.stopPropagation();
      if (nweetObj.like.includes(authService.currentUser.uid, 0)) {
        await dbService.doc(`nweets/${nweetObj.id}`).update({
          like: dbStore.FieldValue.arrayRemove(
            `${authService.currentUser.uid}`,
          ),
        });
        setIsLike(false);
        return;
      }
      await dbService.doc(`nweets/${nweetObj.id}`).update({
        like: dbStore.FieldValue.arrayUnion(`${authService.currentUser.uid}`),
      });
      setIsLike(true);
    };
    const onReNweetBtnClick = async (e) => {
      e.stopPropagation();
      if (nweetObj.reNweet.includes(authService.currentUser.uid, 0)) {
        await dbService.doc(`nweets/${nweetObj.id}`).update({
          reNweet: dbStore.FieldValue.arrayRemove(
            `${authService.currentUser.uid}`,
          ),
        });
        setIsReNweeted(false);
        return;
      }
      await dbService.doc(`nweets/${nweetObj.id}`).update({
        reNweet: dbStore.FieldValue.arrayUnion(
          `${authService.currentUser.uid}`,
        ),
      });
      setIsReNweeted(true);
    };
    const onMenuClick = (e) => {
      e.stopPropagation();
      if (e.target.nodeName === "SPAN") {
        setMenuOn((prevState) => ({
          ...prevState,
          kebab: true,
          share: false,
        }));
      } else {
        setMenuOn((prevState) => ({
          ...prevState,
          kebab: false,
          share: true,
        }));
      }
    };
    const onNweetClick = (e) => {
      if (e.target.nodeName !== "svg") {
        const to = `/user/${nweetObj.createrId}/detail/${nweetObj.id}`;
        history.push(to);
      }
    };
    const stopBubble = (e) => {
      e.stopPropagation();
    };
    const onIgnoreClick = (e) => {
      e.stopPropagation();
      console.log("무시하기 눌림");
    };
    const onShareLinksClick = () => {
      navigator.clipboard
        .writeText(
          `loevray.github.io/nwitter/#/user/${nweetObj.createrId}/detail/${nweetObj.id}`,
        )
        .then(() => {
          setCopyed((prev) => !prev);
          console.log("succes");
          setMenuOn((prevState) => ({
            ...prevState,
            kebab: false,
            share: false,
          }));
          timeout.current = setTimeout(() => {
            setCopyed(false);
          }, 3500);
        });
    };
    return (
      <div className="nweet_wrapper">
        {isReNweet && (
          <div className="nweet_renweet">
            <span>{reNweeter}님이 리트윗 함</span>
          </div>
        )}
        <div className="nweet" onClick={onNweetClick}>
          <div className="nweet_left">
            <Link to={`/user/${nweetObj.createrId}`} onClick={stopBubble}>
              <img
                className="nweet_profile_img"
                src={nweetObj.profile}
                alt="img"
              />
            </Link>
          </div>
          <div className="nweet_right">
            <div className="nweet_right_top">
              <div className="nweet_info">
                <span className="nweet_info_displayName">
                  <Link to={`/user/${nweetObj.createrId}`} onClick={stopBubble}>
                    {nweetObj.displayName}
                  </Link>
                </span>
                <span className="nweet_info_userId">@{userId[0]}</span>
                <span className="block">·</span>
                <span className="nweet_info_timeAgo">{postTime}</span>
              </div>
              <div className="nweet_menu_wrapper">
                <span className="nweet_menu" onClick={onMenuClick}>
                  •••
                </span>
                {menuOn.kebab && isOwner && (
                  <>
                    <DropMenu
                      menuData={[
                        {
                          text: "이 트윗 삭제하기",
                          onClick: onDeleteClick,
                          id: 1,
                        },
                        { text: "이 트윗 땡땡하기", id: 2 },
                      ]}
                      setMenuOn={setMenuOn}
                    />
                  </>
                )}
                {menuOn.kebab && !isOwner && (
                  <DropMenu
                    menuData={[
                      {
                        text: "이 트윗 관심없음",
                        id: 3,
                      },
                      { text: "이 유저 차단하기", id: 4 },
                    ]}
                    setMenuOn={setMenuOn}
                  />
                )}
              </div>
            </div>
            {nweetObj.commentUserUid && (
              <div className="nweet_right_comment">
                <Link
                  to={`/user/${nweetObj.commentUserUid}`}
                  onClick={stopBubble}
                >
                  <span className="nweet_commented_id">
                    @{nweetObj.commentUserId}
                  </span>
                </Link>
                <span className="nweet_commented_text">님에게 보내는 답글</span>
              </div>
            )}
            <div className="nweet_right_center">
              <div className="nweet_content">{nweetObj.text}</div>
              {nweetObj.hashTag && (
                <span className="nweet_hashtag">{nweetObj.hashTag}</span>
              )}
              {nweetObj.attachmentUrl && (
                <div className="nweet_content_img_wrapper">
                  <Link to={nweetObj.attachmentUrl}>
                    <img src={nweetObj.attachmentUrl} alt="img" />
                  </Link>
                </div>
              )}
            </div>
            <div className="nweet_right_bottom">
              <div className="nweet_right_bottom_comment nweet_icon_menus">
                <CommentWhite />
                <span>{commentSize}</span>
              </div>

              <div
                className="nweet_right_bottom_reNweet nweet_icon_menus"
                onClick={onReNweetBtnClick}
              >
                {isReNweeted ? <ReNweetBold /> : <ReNweet />}
                <span>{nweetObj.reNweet.length}</span>
              </div>
              <div
                className="nweet_right_bottom_like nweet_icon_menus"
                onClick={onLikeBtnClick}
              >
                {isLike ? <Like /> : <UnLiked />}
                <span>{nweetObj.like.length}</span>
              </div>
              <div
                className="nweet_right_bottom_share nweet_icon_menus"
                onClick={onMenuClick}
              >
                <ShareLink />
                {menuOn.share && (
                  <DropMenu
                    menuData={[
                      {
                        text: "트윗 링크 복사하기",
                        onClick: onShareLinksClick,
                        id: 5,
                      },
                      { text: "다음을 통해 트윗 공유하기", id: 6 },
                    ]}
                    setMenuOn={setMenuOn}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default Nweet;
