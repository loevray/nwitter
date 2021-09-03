import Nweet from "components/Nweets/Nweet";
import NweetFactory from "components/Nweets/NweetFactory";
import { dbService, storageService } from "fbase";
import React, { useEffect, useRef, useState } from "react";
import "../css/Home.css";

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([]);
    const [userProfileImg, setUserProfileImg] = useState("");
    const topCoord = useRef();
    // 1) 컴포넌트 mount될때 실행.
    // 2) nweets컬렉션에서 스냅샷들 가져옴(일종의 데이터). orderby로 시간차순 정렬.
    // 3) 그걸 map으로 분해 후, nweetArray에 할당. 마지막으로 setNweets로 nweets에 배열 다시 보냄.
    useEffect(() => {
         const profileIs = async () => {
            if(userObj.profileImg === null) {
                let profileUrl = "";
                const storageRef = storageService.ref().child(`userDeafultSet/profile_img/userprofile.png`);
                profileUrl = await storageRef.getDownloadURL();
                userObj.profileImg = profileUrl;
                const userSetObj = {
                    profileImg: userObj.profileImg,
                    backgroundimg: 1
                };
                await dbService.collection("userInfo").doc(userObj.uid).set(userSetObj);
            }
            dbService.collection("userInfo").doc(`${userObj.uid}`).onSnapshot((snaps) => {
                 setUserProfileImg(snaps.data().profileImg);
             });
        };
        dbService.collection("nweets").orderBy("createdAt","desc").onSnapshot((snapshot) => {
            const nweetInfoObj = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data(),
            }));
            setNweets(nweetInfoObj);
        });
        profileIs();
    }, []);
    const onClick = () => {
        topCoord.current.scrollIntoView(false);
    };
    return(
    <>
    <div className="home_center">
        <div className="home_center_wrapper">
            <div className="home_center_homebar_wrapper" onClick={onClick}>
                <div className="home_center_homebar">
                <span>홈</span>
                <span>★</span>
                </div>
            </div>
            <div className="home_center_nweet_wrapper" ref={topCoord}>
                <div className="home_center_nweet_profile_img">
                    프로필 사진
                </div>
                <NweetFactory userObj={userObj} />
            </div>
            <div className="home_center_bottom">
                <div className="nweets">
                    {/* nweets에서 받아온 배열을 map으로 분해 및 텍스트 출력. */}
                    {nweets.map((a_nweet) => (
                        <Nweet key={a_nweet.id} 
                        nweetObj={a_nweet} 
                        isOwner={a_nweet.createrId === userObj.uid}
                        userProfileImg={userProfileImg}
                        />
                ))} 
                </div>
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
                여긴 중앙화면의 아래
                <br />
            </div>
        </div>
    </div>
    </>
    );
};

export default Home;