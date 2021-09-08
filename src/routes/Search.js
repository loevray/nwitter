import React from "react";
import "./Search.css"

const Search = () => {
    return(
    <div className="search">
        <div className="search_wrapper">
            <div className="search_bar_wrapper">
                <div className="search_bar">
                    <span>찾기</span>
                    <span>★</span>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Search;