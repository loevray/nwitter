import React, { useState } from "react";

const EditProfile = ({ userObj, refreshUser, setEdit }) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onChange = (event) =>{
        const {target: {value}} = event;
        setNewDisplayName(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName,
            })
            refreshUser();
        }
    };
    const onClick = () => {
        setEdit(false);
    }
    return(
        <>
        <form onSubmit={onSubmit} >
            <input onChange={onChange} type="text" value={newDisplayName} placeholder="display name" />
            <input type="submit" value="Update Profile" />
        </form>
        <button onClick={onClick}> 닫기 </button>
        </>
    );
};

export default EditProfile;