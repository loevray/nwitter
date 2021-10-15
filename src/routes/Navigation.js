import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Navigation.css";
import { authService } from "fbase";
import { useState } from "react";
import { useEffect } from "react";
import { ReactComponent as HomeWhite } from "../svg/home_white.svg";
import { ReactComponent as HomeBlack } from "../svg/home_black.svg";
import { ReactComponent as Profilewhite } from "../svg/profile_white.svg";
import { ReactComponent as ProfileBlack } from "../svg/profile_black.svg";

const Navigation = ({ userObj }) => {
  const [path, setPath] = useState({});
  const history = useHistory();
  useEffect(() => {
    const putPathName = () => {
      const pathName = window.location.hash;
      const pathCut = pathName.split("/");
      if (
        pathCut.length === 3 &&
        pathCut[1] === "user" &&
        path.user === false
      ) {
        setPath((prevState) => ({
          ...prevState,
          home: false,
          user: true,
        }));
      }
      if (pathCut[1] === "home") {
        setPath((prevState) => ({
          ...prevState,
          home: true,
          user: false,
        }));
      }
    };
    putPathName();
    window.addEventListener("hashchange", putPathName);
  }, [path.home]);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  return (
    <nav className="nav">
      <div className="nav_menu_wrapper1">
        <div className="nav_menu_wrapper2">
          <div className="nav_menu">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="nav_birdImg2"
            >
              <g>
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
              </g>
            </svg>
            <ul>
              <li>
                <Link to="/home">
                  <div className="nav_home_wrapper">
                    <div className="nav_home">
                      {path.home ? <HomeBlack /> : <HomeWhite />}
                      <span
                        style={path.home ? { fontWeight: "bold" } : null}
                        className="nav_menu_text_home"
                      >
                        홈
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link to={`/user/${userObj.uid}`}>
                  <div className="nav_profile_wrapper">
                    <div className="nav_profile">
                      {path.user ? <ProfileBlack /> : <Profilewhite />}
                      <span
                        className="nav_menu_text_profile"
                        style={path.user ? { fontWeight: "bold" } : null}
                      >
                        프로필
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <button onClick={onLogOutClick}>Log Out</button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navigation;
