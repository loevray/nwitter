import React from "react";
import { useEffect } from "react";
import DropMenuList from "./DropMenuList";

const DropMenu = ({ menuData, setMenuOn }) => {
  useEffect(() => {
    const menuOff = (event) => {
      if (
        !event.target.classList.contains("nweet_drop_down") &&
        !event.target.classList.contains("nweet_delete_nweet")
      ) {
        setMenuOn((prevState) => ({
          ...prevState,
          kebab: false,
          share: false,
        }));
      }
    };
    document.body.addEventListener("mousedown", menuOff);
    return () => {
      document.body.removeEventListener("mousedown", menuOff);
    };
  }, []);
  const stopBubble = (e) => {
    e.stopPropagation();
  };
  return (
    <div onClick={stopBubble} className="nweet_drop_down">
      <div className="nweet_drop_menu">
        {menuData.map((_menuData) => (
          <DropMenuList
            key={_menuData.id}
            text={_menuData.text}
            onClick={_menuData.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default DropMenu;
