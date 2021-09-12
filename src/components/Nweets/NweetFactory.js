import { dbService, storageService } from "fbase";
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./NweetFactory.css";

const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const [nweetTyped, setNweetTyped] = useState(false);
    const [hashTag, setHashTag] = useState([]);
    const fileInput = useRef();
    const nweetText = useRef();
    useEffect(() => {
        const config = { characterData: true, childList: true, subtree: true };
        const callback = function(mutationList, observer) {
            for(let mutation of mutationList) {
                if (mutation.type === "characterData") {
                    let nweetWord = nweetText.current.innerText;
                    const hashRegex = /\#[가-힣ㄱ-ㅎa-zA-z0-9]*\s/g;
                    const result = nweetWord.match(hashRegex);
                    const deleteHash = nweetWord.replace(hashRegex,"");
                    if(hashRegex.test(nweetWord)){
                      setHashTag(result);
                    }
                    setNweet(deleteHash);
                    setNweetTyped(true);
                } else if (nweetText.current.innerText === "") {
                    setNweetTyped(false);
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(nweetText.current, config);
    }, [])
    const onSubmit = async (event) => {
        event.preventDefault();
        if(nweet === ""){
            alert("내용을 입력해주세요!");
            return;
        }
        let attachmentUrl = "";
        let date = new Date();
        if(attachment !== ""){
            const attachmentRef = storageService.ref().child(`${userObj.uid}/nweet_img/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const nweetObj = {
            text: nweet,
            createdAt: [date.getTime(), date.getFullYear(), date.getMonth(), date.getDay(), date.getHours(), date.getMinutes()],
            createrId: userObj.uid,
            attachmentUrl,
            reNweet: [],
            like: [],
            hashTag: hashTag,
            profile: userObj.photoURL,
            displayName: userObj.displayName,
            userEmail: userObj.email
        };
        await dbService.collection("nweets").add(nweetObj);
        setNweet("");
        setAttachment("");
        nweetText.current.innerText = "";
    };
    const onFileChange = (event) => {
        const {target:{files}} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget:{result}} = finishedEvent;
            setAttachment(result);
        };
        if(theFile){
            reader.readAsDataURL(theFile);
        }
    };
/*     const onClearAttachment = () => {
        fileInput.current.value = null;
        setAttachment("");
    }; */
    const onFileClick = (event) => {
        event.target.value = null;
    }
    const aaaa = () => {
        return;
    }
    return(
        <>
        <div className="nweet_factory_right">
            <div className="nweet_factory_nweet_wrapper">
                <div 
                className={ nweetTyped ? "hidden placeholder" : "placeholder"}>
                무슨 일이 일어나고 있나요?
                </div>
                    <span
                    className="nweet_factory_nweet_text"
                    role="textbox"
                    contentEditable="true"
                    suppressContentEditableWarning="true"
                    maxLength="80"
                    htmlFor="put_text"
                    ref={nweetText}
                    >
                    </span>
            </div>
            {attachment && 
                <div className="nweet_factory_attachmentImg">
                    <img src={attachment} alt="img" />
                    {/* <button onClick={onClearAttachment} >Clear</button> */}
                </div>
                }
            <form onSubmit={onSubmit} className="nweet_factory_form">
                    <textarea
                    className="nweet_factory_nweet_input hidden" 
                    placeholder="무슨일?" 
                    maxLength="80" 
                    id="put_text"
                    value={nweet}
                    onChange={aaaa}
                    />
                <div className="nweet_factory_form_bottom">
                    <div className="nweet_factory_choose_img">
                        <label htmlFor="inputt">
                            <svg viewBox="0 0 24 24" 
                            aria-hidden="true" 
                            className="icon"
                            >
                                <g>
                                    <path d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z">
                                    </path>
                                    <circle cx="8.868" cy="8.309" r="1.542">
                                    </circle>
                                </g>
                            </svg>
                            <input
                            id="inputt"
                            className="nweet_factory_choosefile hidden"
                            type="file" 
                            accept="image/*" 
                            onChange={onFileChange}
                            onClick={onFileClick}
                            ref={fileInput} />
                        </label>
                    </div>
                    <input 
                    className={nweetTyped ? "nweet_factory_nweet_on" : "nweet_factory_nweet_off"}
                    type="submit"
                    value="트윗하기" />
                </div>
            </form>
        </div>
        </>
    );
};
export default NweetFactory;