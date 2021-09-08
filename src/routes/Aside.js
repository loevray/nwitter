import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react/cjs/react.development";
import "./Aside.css"

const Aside = () => {
    const [searchValue, setSearchValue] = useState("");
    const [searchClicked, setSearchClicked] = useState(false);
    const [notLocal, setNotLocal] = useState(true);
    useEffect(() => {
        const labelStyleRecover = (event) => {
            if(!label.current.contains(event.target)){
                setSearchClicked(false);
                searchIcon.current.style.fill = "#787a88";
            }
        }
        document.body.addEventListener("mousedown", labelStyleRecover)
        return () => {
        document.body.removeEventListener("mousedown", labelStyleRecover)
        }
    })
    const label = useRef();
    const searchIcon = useRef();
    const onSearchClick = () => {
            setSearchClicked(true);
            searchIcon.current.style.fill = "#00acee";
            if(window.localStorage.getItem("최근검색") !== null){
                setNotLocal(false);
            }
    };
    const onChange = (event) => {
        setSearchValue(event.target.value);
    }
    const onSearchSubmit = (event) => {
        event.preventDefault();
        window.localStorage.setItem("최근검색",searchValue);
        setSearchValue("");
        setNotLocal(false)
    };
    return(
        <div className="aside">
            <div className="aside_wrapper">
                <div className="aside_left">
                    <div onClick={onSearchClick} className="aside_left_search">
                        <label className={searchClicked ? "label_click" : "label_out"} ref={label}>
                            <div className="aside_left_search_left">
                                <svg viewBox="0 0 24 24" 
                                aria-hidden="true" 
                                className="aside_left_search_icon"
                                ref={searchIcon}>
                                    <g>
                                        <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
                                        </path>
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
                                    <input
                                    type="submit"
                                    value="제출"
                                    className="hidden"
                                    />
                            </form>
                            <div className="aside_left_search_right">
                                <span></span>
                            </div>
                        </label>
                        <div className={searchClicked && notLocal ? "test1" : "hidden"}>
                            {searchValue && <span>"{searchValue}"검색</span>}
                        </div>
                    </div>
                    <div className="aside_left_trend">
                        <div className="aside_left_trend_1">
                            <span>트렌드</span>
                            <span>아무튼 톱니바퀴임</span>
                        </div>
                        <div className="aside_left_trend_2">
                            1.으앵
                        </div>
                        <div className="aside_left_trend_3">
                            2.응애
                        </div>
                        <div className="aside_left_trend_4">
                            3.응애
                        </div>
                        <div>
                            더보기임
                        </div>
                    </div>
                    <div className="aside_left_follow_recommend">
                        팔로우 추천
                    </div>
                    <div className="aside_left_footer">
                    이용약관
                    개인정보 처리방침
                    쿠키 정책
                    광고 정보
                    더 보기
                    © 2021 Twitter, Inc.
                    </div>
                </div>
                <div className="aside_right">
                </div>
            </div>
        </div>
    );
};

export default Aside;