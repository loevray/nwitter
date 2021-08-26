import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([]);
    // 1) 컴포넌트 mount될때 실행.
    // 2) nweets컬렉션에서 스냅샷들 가져옴(일종의 데이터). orderby로 시간차순 정렬.
    // 3) 그걸 map으로 분해 후, nweetArray에 할당. 마지막으로 setNweets로 nweets에 배열 다시 보냄.
    useEffect(() => {
        dbService.collection("nweets").orderBy("createdAt","desc").onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map(doc => ({
                id:doc.id, 
                ...doc.data(),
            }));
            setNweets(nweetArray);
        });
    }, []);

    return(
    <div className="nweetWrapper">
        <NweetFactory userObj={userObj} />
        <div>
            {/* nweets에서 받아온 배열을 map으로 분해 및 텍스트 출력. */}
            {nweets.map((a_nweet) => (
                <Nweet key={a_nweet.id} nweetObj={a_nweet} isOwner={a_nweet.createrId === userObj.uid} />
            ))} 
        </div>
    </div>
    );
};

export default Home;