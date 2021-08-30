import { authService, dbService, dbStore, storageService } from "fbase";
import React, { useEffect, useRef, useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const likeBtn = useRef();
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
    const onClick = async () => {
        if(
            nweetObj.like.includes(authService.currentUser.uid, 1)
            ){
            await dbService.doc(`nweets/${likeBtn.current.name}`).update({
            like: dbStore.FieldValue.arrayRemove(`${authService.currentUser.uid}`)
            })
            return;
        }
        await dbService.doc(`nweets/${likeBtn.current.name}`).update({
            like: dbStore.FieldValue.arrayUnion(`${authService.currentUser.uid}`)
        })
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
                    <h4>{nweetObj.text}</h4>
                    <button name={nweetObj.id} ref={likeBtn} onClick={onClick}>좋아요</button>
                    <h3>좋아요:{nweetObj.like.length - 1}
                    </h3>
                    {nweetObj.attachmentUrl && 
                    (
                        <img src={nweetObj.attachmentUrl} alt="img" width="50px" height="50px" />
                    )
                    }
                    { isOwner && (
                    <>
                        <button onClick={onDeleteClick} >Delete Nweet</button>
                        <button onClick={toggleEditing} >Edit Nweet</button>
                    </>
                    )}
                 </>
            }
            </>
    );
};

export default Nweet;