import React from "react";
import SearchResultUsers from "./SearchResultUsers";

const SearchDropMenu = ({ searchValue }) => {
  return (
    <div className="test1">
      {searchValue && <span>"{searchValue}"검색</span>}
      <SearchResultUsers />
    </div>
  );
};

export default SearchDropMenu;
