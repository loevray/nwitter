import React from "react";
import {Link} from "react-router-dom";

const Navigation = ({ userObj }) => {
    if(userObj.displayName === null){
        userObj.displayName = "익명";
    }
    return(
        <nav className="nav">
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/profile"> {userObj.displayName}'s Profile </Link>
                </li>
            </ul>
        </nav>
    );
}
;

export default Navigation;