import React, { useEffect } from "react";
import { useState } from "react";

const GetPopularTag = ({ hashTagArray }) => {
  const [fill, setFill] = useState(false);
  useEffect(() => {
    if (hashTagArray !== []) {
      setFill(true);
    }
  }, [hashTagArray]);
  return (
    <div className="aside_left_trend_2">
      <div className="trend_top">
        <span className="trend_gray">트렌드</span>
        <span className="trend_gray">•••</span>
      </div>
      <div className="trend_remainder">
        <span className="trend_remainder_hashTag">
          {fill ? hashTagArray.hashTag : "없음"}
        </span>
        <span className="trend_gray">(횟수)</span>
      </div>
    </div>
  );
};

export default GetPopularTag;
