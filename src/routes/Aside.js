import AsideFollow from "components/Aside/AsideFollow";
import AsideTrend from "components/Aside/AsideTrend";
import AsideSearchForm from "components/Aside/AsideSearchForm";
import React from "react";
import "./Aside.css";

const Aside = () => {
  return (
    <div className="aside">
      <div className="aside_wrapper">
        <div className="aside_left">
          <AsideSearchForm />
          <AsideTrend />
          <AsideFollow />
          <div className="aside_left_footer">
            <span>
              이용약관&nbsp; 개인정보 처리방침&nbsp; 쿠키 정책
              <br />
              광고 정보&nbsp; 더 보기&nbsp; © 2021 Twitter, Inc.
            </span>
          </div>
        </div>
        <div className="aside_right"></div>
      </div>
    </div>
  );
};

export default Aside;
