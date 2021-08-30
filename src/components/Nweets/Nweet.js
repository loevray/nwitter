import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
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