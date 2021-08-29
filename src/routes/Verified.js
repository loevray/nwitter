import React, { useEffect } from "react";

const Verified = ({ setNotWatching }) => {
    useEffect(() => {
        setNotWatching(false);
    })
    const onClick = () => {
        window.localStorage.removeItem("sendMail");
        window.close();
    }
    return(
        <div>
            <span>인증이 완료되었습니다</span>
            <button onClick={onClick}>확인</button>
        </div>
    );
};

export default Verified;