import React, { useEffect } from "react";
import { useRef } from "react";
import "./Aside.css"

const Aside = () => {
    //useState 일부러 사용 안함. 한번 더 렌더링 되기 때문에...근데 코드 보기 싫네;;
    useEffect(() => {
        const labelStyleRecover = (event) => {
            if(!label.current.contains(event.target)){
                const LABEL_STYLE = label.current.style;
                LABEL_STYLE.cursor = "text";
                LABEL_STYLE.backgroundColor = "#EFF3F4";
                LABEL_STYLE.border = "1px solid #EFF3F4";
                LABEL_STYLE.borderRadius = "10vh";
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
        const LABEL_STYLE = label.current.style;
        LABEL_STYLE.cursor = "auto";
        LABEL_STYLE.backgroundColor = "white";
        LABEL_STYLE.border = "1px solid #00acee";
        LABEL_STYLE.borderRadius = "10vh";
        searchIcon.current.style.fill = "#00acee";
    };
    const onSearchSubmit = (event) => {
        event.prevenDefault();
        
    };
    return(
        <div className="aside">
            <div className="aside_wrapper">
                <div className="aside_left">
                    <div onClick={onSearchClick} className="aside_left_search">
                        <label ref={label}>
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