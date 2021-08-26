import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import "../css/App.css";
import GlobalStyle from "./GlobalStyle";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () =>{
    const user = authService.currentUser;
      setUserObj({
        displayName: user.displayName,
        uid: user.uid,
        updateProfile: (args) => user.updateProfile(args),
      });
  };
  return (
    <>
    <GlobalStyle />
    <div className="main_wrapper_1">
      <div className="main_top">
        <header className="header">
          <div className="birdImg">
            <svg viewBox="0 0 24 24" 
            aria-hidden="true">
              <g>
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z">
                </path>
              </g>
            </svg>
          </div>
        </header>
        <main className="main" >
        <div className="birdImg2_wrapper">
          <svg viewBox="0 0 24 24"
          aria-hidden="true"
          className="birdImg2">
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z">
                </path>
              </g>
          </svg>
        </div>
          <div className="main_text_wrapper">
            <span>지금 일어나고 있는 일</span>
            <span>오늘 느위터에 로그인하세요.</span>
          </div>
          {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "initializing..." }
          <span>계정이 아직 없으신가요?</span>
          <span>Create Account</span>
        </main>
      </div>
      <div className="main_bottom">
        <footer className="footer">
        소개
        고객센터
        이용약관
        개인정보 처리방침
        쿠키 정책
        광고 정보
        블로그
        상태
        채용
        브랜드 리소스
        광고
        마케팅
        비즈니스용 트위터
        개발자
        디렉터리
        설정
        &copy;{new Date().getFullYear()}Nwitter</footer>
      </div>
      </div>
    </>
  );
}

export default App;
