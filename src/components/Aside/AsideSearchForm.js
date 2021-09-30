import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";

const AsideSearchForm = () => {
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [firstSearch, setFirstSearched] = useState(true);
  const label = useRef();
  const searchIcon = useRef();
  const history = useHistory();
  useEffect(() => {
    const labelStyleRecover = (event) => {
      if (!label.current.contains(event.target)) {
        setSearchClicked(false);
        searchIcon.current.style.fill = "#787a88";
      }
    };
    document.body.addEventListener("mousedown", labelStyleRecover);
    return () => {
      document.body.removeEventListener("mousedown", labelStyleRecover);
    };
  }, []);
  const onSearchClick = () => {
    setSearchClicked(true);
    searchIcon.current.style.fill = "#00acee";
    if (window.localStorage.getItem("최근검색") !== null) {
      setFirstSearched(false);
    }
  };
  const onChange = (event) => {
    setSearchValue(event.target.value);
  };
  const onSearchSubmit = (event) => {
    event.preventDefault();
    window.localStorage.setItem("최근검색", searchValue);
    history.push(`/search/${searchValue}`);
    setSearchValue("");
    setFirstSearched(false);
  };
  const onXbtnClick = () => {
    setSearchValue("");
  };
  return (
    <div onClick={onSearchClick} className="aside_left_search">
      <label
        className={searchClicked ? "label_click" : "label_out"}
        ref={label}
      >
        <div className="aside_left_search_left">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="aside_left_search_icon"
            ref={searchIcon}
          >
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
        </div>
        <form onSubmit={onSearchSubmit} className="aside_left_search_center">
          <input
            className="aside_left_search_input"
            type="text"
            placeholder="트위터 검색"
            value={searchValue}
            onChange={onChange}
          />
          <input type="submit" value="제출" className="hidden" />
        </form>
        <div className="aside_left_search_right">
          <span onClick={onXbtnClick}></span>
        </div>
      </label>
      {/*       {searchClicked && firstSearch ? (
        <SearchDropMenu searchValue={searchValue} />
      ) : null} */}
    </div>
  );
};

export default AsideSearchForm;
