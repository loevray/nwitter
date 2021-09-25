import { dbService } from "fbase";
import React from "react";
import { useState } from "react";

const NweetEdit = ({ nweetObj, setEditing }) => {
  const toggleEditing = () => setEditing((prev) => !prev);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Edit your nweet"
          value={newNweet}
          maxLength="80"
          required
        />
        <input type="submit" value="Update Nweet" />
      </form>
      <button onClick={toggleEditing}>Cancel</button>
    </>
  );
};

export default NweetEdit;
