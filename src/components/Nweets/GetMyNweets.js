import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const GetMyNweets = ({ userObj }) => {
    const [myNweets, setMyNweets] = useState("");
    const getMyNweets = async() => {
        const nweets = await dbService.collection("nweets").where("createrId", "==", userObj.uid).orderBy("createdAt","desc").get();
        const nweetsMap = nweets.docs.map((doc) => doc.data().text);
        setMyNweets(nweetsMap);
    }
    useEffect(() => {
        getMyNweets();
    }, []);
    return(
        <span>{myNweets}</span>
    );
};

export default GetMyNweets;
