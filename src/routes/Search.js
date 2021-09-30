import Nweet from "components/Nweets/Nweet";
import { dbService } from "fbase";
import React, { useEffect } from "react";
import { useState } from "react";
import "./Search.css";

const Search = ({ userObj, match }) => {
  const [resultNweets, setResultNweets] = useState([]);
  useEffect(() => {
    console.log("redner from search");
    dbService
      .collection(`nweets`)
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        if (snapshot) {
          const allNweets = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          if (allNweets) {
            const filteredNweets = allNweets.filter(function (el) {
              return el.text.includes(match.params.value);
            });
            setResultNweets(filteredNweets);
          }
        }
      });
    return () => {
      setResultNweets([]);
    };
  }, [match.params.value]);
  return (
    <div className="search">
      <div className="search_wrapper">
        <div className="search_bar_wrapper">
          <div className="search_bar">
            <span>찾기</span>
            <span>★</span>
          </div>
        </div>
        {resultNweets.map((nweet) => (
          <Nweet key={nweet.id} nweetObj={nweet} userObj={userObj} />
        ))}
      </div>
    </div>
  );
};

export default Search;
