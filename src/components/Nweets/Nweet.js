import { authService, dbService, dbStore, storageService } from "fbase";
import React, { useRef, useState } from "react";
import "./Nweet.css"

const Nweet = ({ nweetObj, isOwner, profile }) => {
    const [editing, setEditing] = useState(false);
    const [menuOn, setMenuOn] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const likeBtn = useRef();
    const menuBtn = useRef();
    const reNweetBtn = useRef();
    // useEffect(() => {
    //     if(menuBtn && menuBtn.current) {
    //         document.menuBtn.current.addEventListener("blur", wowFunc)
    //     }
    //     const wowFunc = (event) => {
    //         setMenuOn(false);
    //     };
    // }, [])
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
        if(nweetObj.like.includes(authService.currentUser.uid, 1)) {
            await dbService.doc(`nweets/${likeBtn.current.name}`).update({
            like: dbStore.FieldValue.arrayRemove(`${authService.currentUser.uid}`)
            })
            return;
        }
        await dbService.doc(`nweets/${likeBtn.current.name}`).update({
            like: dbStore.FieldValue.arrayUnion(`${authService.currentUser.uid}`)
        })
    }
    const onReNweetBtnClick = async () => {
        if(nweetObj.reNweet.includes(authService.currentUser.uid, 1)) {
            await dbService.doc(`nweets/${reNweetBtn.current.name}`).update({
            reNweet: dbStore.FieldValue.arrayRemove(`${authService.currentUser.uid}`)
            })
            return;
        }
        await dbService.doc(`nweets/${reNweetBtn.current.name}`).update({
            reNweet: dbStore.FieldValue.arrayUnion(`${authService.currentUser.uid}`)
        })
    }
    const onMenuClick = () => {
        setMenuOn(prev => !prev);
    }
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
                                    <h4>닉네임 : </h4>
                                    <h4>트윗 시간: </h4>
                                </div>
                                <div className="nweet_menu_wrapper">
                                        <button ref={menuBtn} className="nweet_menu" onClick={onMenuClick}>메뉴</button>
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
                                <h4 className="nweet_content">내용: {nweetObj.text}</h4>
                            </div>
                            <div className="nweet_right_bottom">
                            <button name={nweetObj.id} ref={likeBtn} onClick={onLikeBtnClick}>좋아요</button>
                                <h3>좋아요:{nweetObj.like.length - 1}</h3>
                            <button name={nweetObj.id} ref={reNweetBtn} onClick={onReNweetBtnClick}>리트윗</button>
                                <h3>리트윗:{nweetObj.reNweet.length - 1}</h3>
                            </div>
                        </div>
                        {nweetObj.attachmentUrl && (
                            <img src={nweetObj.attachmentUrl} alt="img" width="50px" height="50px" />
                        )}
                    </div>
                </div>
                 </>
            }
            </>
    );
};

export default Nweet;