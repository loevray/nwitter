import React from "react";

const GetPopularTag = ({ hashTagArray }) => {
  return (
    <div className="aside_left_trend_2">
      <div className="trend_top">
        <span className="trend_gray">트렌드</span>
        <span className="trend_gray">•••</span>
      </div>
      <div className="trend_remainder">
        <span className="trend_remainder_hashTag">
          {hashTagArray.hashTag ? hashTagArray.hashTag[0] : "없음"}
        </span>
        <span className="trend_gray">(횟수)</span>
      </div>
    </div>
  );
};

export default GetPopularTag;
