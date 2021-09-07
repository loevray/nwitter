import { authService, dbService, dbStore, storageService } from "fbase";
import React, { useEffect, useRef, useState } from "react";
import "./Nweet.css"

const Nweet = ({ nweetObj, isOwner, profile, userObj }) => {
    const [editing, setEditing] = useState(false);
    const [menuOn, setMenuOn] = useState(false);
    const [nweetTime, setNweetTime] = useState("");
    const [userId, setUserId] = useState("");
    const [time, setTime] = useState("");
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    useEffect(() => {
        console.log("render from Nweet.js");
        const nweetAt = `
        ${nweetObj.createdAt[1]}년 
        ${nweetObj.createdAt[2]}월 
        ${nweetObj.createdAt[3]}일
        ${nweetObj.createdAt[4]}시
        ${nweetObj.createdAt[5]}분
        `;
        setNweetTime(nweetAt);
        let now = new Date().getTime();
        let second = Math.floor((now - nweetObj.createdAt[0])/1000);
        if(second>2592000) {
            setTime(`${Math.floor(second/2592000)}달`)
        } else if(second>604800) {
            setTime(`${Math.floor(second/604800)}주`)
        } else if(second>86400) {
            setTime(`${Math.floor(second/86400)}일`)
        } else if(second>3600) {
            setTime(`${Math.floor(second/3600)}시간`)
        } else if(second>60) {
            setTime(`${Math.floor(second/60)}분`)
        } else if(second === 0) {
            setTime(`따끈따끈`)
        } else if(60>=second) {
            setTime(`${second}초 전`)
        }
        const userId = nweetObj.userEmail.split("@");
        setUserId(userId);
 }, [])
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if(ok) {
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            if(nweetObj.attachmentUrl !== "") {
                await storageService.refFromURL(nweetObj.attachmentUrl).delete();
            }
        }
    };
    const toggleEditing = () => setEditing(prev => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet
        });
        setEditing(false);
    };
    const onChange = (event) => {
        const {target :{value}} = event;
        setNewNweet(value);
    };
    const onLikeBtnClick = async () => {
        if(nweetObj.reNweet.includes(authService.currentUser.uid, 0)) {
            await dbService.doc(`nweets/${nweetObj.id}`).update({
            like: dbStore.FieldValue.arrayRemove(`${authService.currentUser.uid}`)
            })
            return;
        }
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            like: dbStore.FieldValue.arrayUnion(`${authService.currentUser.uid}`)
        })
    };
     const onReNweetBtnClick = async () => {
        if(nweetObj.reNweet.includes(authService.currentUser.uid, 0)) {
            await dbService.doc(`nweets/${nweetObj.id}`).update({
            reNweet: dbStore.FieldValue.arrayRemove(`${authService.currentUser.uid}`)
            })
            return;
        }
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            reNweet: dbStore.FieldValue.arrayUnion(`${authService.currentUser.uid}`)
        })
    };
    const onMenuClick = () => {
        setMenuOn(prev => !prev);
    };
    return (
        <>
            {editing ? 
                <>
                {isOwner && <>
                <form onSubmit={onSubmit} >
                    <input onChange={onChange} type="text" placeholder="Edit your nweet" value={newNweet} maxLength="80" required />
                    <input type="submit" value="Update Nweet" />
                </form>
                <button onClick={toggleEditing} >Cancel</button>
                </>
                }
                </>
                :
                <>
                <div className="nweet_wrapper">
                    <div className="nweet">
                        <div className="nweet_left">
                            <img src={profile} alt="img" />
                        </div>
                        <div className="nweet_right">
                            <div className="nweet_right_top">
                                <div className="nweet_info">
                                    <span className="nweet_info_displayName">{nweetObj.displayName}</span>
                                    <span className="nweet_info_userId">{userId[0]}</span>
                                    <span className="block">·</span>
                                    <span className="nweet_info_timeAgo">{time}</span>
                                    {/* <span>{nweetTime}</span> */}
                                </div>
                                <div className="nweet_menu_wrapper">
                                        <button className="nweet_menu" onClick={onMenuClick}>메뉴</button>
                                        { menuOn && isOwner && (
                                        <>
                                        <div className="nweet_drop_down">
                                            <div className="nweet_drop_menu" onClick={onDeleteClick}>
                                                <span className="nweet_delete_nweet">이 트윗 지우기</span>
                                            </div>
                                            <div className="nweet_drop_menu" onClick={toggleEditing}>
                                                <span className="nweet_edit_nweet">이 트윗 수정하기</span>
                                            </div>
                                        </div>
                                        </>
                                        )}
                                        {
                                            menuOn && !isOwner && <button>이 유저에게 관심없음</button>
                                        }
                                </div>
                            </div>
                            <div className="nweet_right_center">
                                <h4 className="nweet_content">{nweetObj.text}</h4>
                                {nweetObj.attachmentUrl && (
                                    <div className="nweet_content_img_wrapper">
                                        <img src={nweetObj.attachmentUrl} alt="img" />
                                    </div>
                                )}
                            </div>
                            <div className="nweet_right_bottom">
                                <div className="nweet_right_bottom_like">
                                    <svg viewBox="0 0 24 24" 
                                    aria-hidden="true" 
                                    onClick={onLikeBtnClick}>
                                        <g>
                                            <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z">
                                            </path>
                                        </g>
                                    </svg>
                                    <span>{nweetObj.like.length}</span>
                                </div>
                                <div className="nweet_right_bottom_reNweet">
                                    <svg viewBox="0 0 24 24" 
                                    aria-hidden="true" 
                                    onClick={onReNweetBtnClick}>
                                        <g>
                                            <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z">
                                            </path>
                                        </g>
                                    </svg>
                                    <span>{nweetObj.reNweet.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 </>
            }
            </>
    );
};

export default Nweet;