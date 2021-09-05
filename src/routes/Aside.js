import React from "react";
import "./Aside.css"

const Aside = () => {
    return(
        <div className="aside">
            <div className="aside_wrapper">
                <div className="aside_left">
                    <div className="aside_left_search">
                        검색
                    </div>
                    <div className="aside_left_trend">
                        트렌드
                    </div>
                    <div className="aside_left_follow_recommend">
                        팔로우 추천
                    </div>
                    <div className="aside_left_footer">
                        이용 약관 등
                    </div>
                </div>
                <div className="aside_right">
                </div>
            </div>
        </div>
    );
};

export default Aside;