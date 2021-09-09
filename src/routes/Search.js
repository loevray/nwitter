import SearchNweet from "components/SearchNweet";
import { dbService } from "fbase";
import React, { useEffect } from "react";
import { useState } from "react";
import "./Search.css"

const Search = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    const searchWordRef = window.localStorage.getItem("최근검색");
    const searchResultRef = dbService.collection("nweets");
    const query = searchResultRef.where("text", "=", `${searchWordRef}`);
    query.onSnapshot((snapshot) => {
       const nweetInfoObj = snapshot.docs.map((doc) => ({
        id:doc.id,
        ...doc.data(),
      }));
      console.log(nweetInfoObj);
      setNweets(nweetInfoObj); 
    }); 
  }, []);
  return(
  <div className="search">
    <div className="search_wrapper">
      <div className="search_bar_wrapper">
        <div className="search_bar">
          <span>찾기</span>
          <span>★</span>
        </div>
      </div>
      {nweets.map((nweet) => 
        <SearchNweet 
        key={nweet.id}
        nweetObj={nweet}
        userObj={userObj}
        />
    )}
    </div>
  </div>
    );
};

export default Search;