import React from "react";

const DropMenuList = ({ text, onClick }) => {
  return (
    <>
      <span className="nweet_delete_nweet" onClick={onClick}>
        {text}
      </span>
    </>
  );
};

export default DropMenuList;
