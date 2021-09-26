import React, { useState } from "react";
import "./EditProfile.css";
import { dbService, storageService } from "fbase";

const EditProfile = ({ userObj, refreshUser, setEdit, stateMessage }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [newStateMsg, setNewStateMsg] = useState(stateMessage);
  const [profileImg, setProfileImg] = useState("");
  const [backgroundImg, setBackgroundImg] = useState("");
  const [newProfile, setNewProfile] = useState(false);
  const [newBack, setNewBack] = useState(false);
  const onNickNameChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onStateMsgChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewStateMsg(value);
  };
  const onNickNameSubmit = async () => {
    if (userObj.displayName !== newDisplayName) {
      const userRef = dbService.collection("nweets");
      const query = userRef.where("createrId", "==", `${userObj.uid}`);
      query.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          userRef.doc(doc.id).update({
            displayName: newDisplayName,
          });
        });
      });
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      const userInfoRef = dbService.collection("userInfo");
      const userInfoQuery = userInfoRef.doc(`${userObj.uid}`);
      userInfoQuery.update({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  const onStateMsgSubmit = () => {
    const userRef = dbService.collection("userInfo");
    const query = userRef.doc(`${userObj.uid}`);
    query.update({
      stateMsg: newStateMsg,
    });
  };
  const onProfileImgSubmit = async (event) => {
    let imgUrl = "";
    if (profileImg !== "") {
      const imgRef = storageService.ref().child(`${userObj.uid}/profile_img/1`);
      const response = await imgRef.putString(profileImg, "data_url");
      imgUrl = await response.ref.getDownloadURL();
      const userRef = dbService.collection("nweets");
      const query = userRef.where("createrId", "==", `${userObj.uid}`);
      query
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            userRef.doc(doc.id).update({
              profile: imgUrl,
            });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      await userObj.updateProfile({
        photoURL: imgUrl,
      });
      const userInfo = dbService.collection("userInfo");
      const userQuery = userInfo.doc(`${userObj.uid}`);
      userQuery.update({
        photoUrl: imgUrl,
      });
    }
    setProfileImg("");
    refreshUser();
  };
  const onBackImgSubmit = async () => {
    let imgUrl = "";
    if (backgroundImg !== "") {
      const imgRef = storageService
        .ref()
        .child(`${userObj.uid}/background_img/1`);
      const response = await imgRef.putString(backgroundImg, "data_url");
      imgUrl = await response.ref.getDownloadURL();
      const userRef = dbService.collection("userInfo");
      const query = userRef.doc(`${userObj.uid}`);
      query.update({
        background: imgUrl,
      });
    }
  };
  const onProfileImgChange = (event) => {
    const {
      target: { files },
    } = event;
    if (files) {
      const theFile = files[0];
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setProfileImg(result);
      };
      setNewProfile(true);
      if (theFile) {
        reader.readAsDataURL(theFile);
      }
    }
  };
  const onBackImgChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setBackgroundImg(result);
    };
    setNewBack(true);
    if (theFile) {
      reader.readAsDataURL(theFile);
    }
  };
  const onProfileCloseClick = () => {
    setEdit(false);
  };
  const onProfileSaveClick = async () => {
    await onNickNameSubmit();
    await onProfileImgSubmit();
    await onBackImgSubmit();
    onStateMsgSubmit();
    setEdit(false);
  };
  return (
    <>
      <div className="edit_profile_menu_wrapper">
        <div className="edit_profile_menu_left">
          <svg
            onClick={onProfileCloseClick}
            className="edit_profile_Xicon"
            viewBox="0 0 20 20"
          >
            <path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
          </svg>
          <span>프로필 수정</span>
        </div>
        <div className="edit_profile_menu_right">
          <span onClick={onProfileSaveClick}> 저장 </span>
        </div>
      </div>
      <div className="edit_profile_content">
        <div className="edit_profile_top_wrapper">
          <div className="edit_profile_top_top">
            <div className="edit_profile_img_wrapper">
              {newBack ? (
                <img
                  className="edit_profile_background_img"
                  src={backgroundImg}
                  alt="back"
                />
              ) : null}
              <label className="edit_profile_background_label">
                <svg className="edit_profile_camera_icon" viewBox="0 0 20 20">
                  <path d="M9.999,8.472c-1.314,0-2.385,1.069-2.385,2.384c0,1.317,1.07,2.385,2.385,2.385c1.316,0,2.386-1.068,2.386-2.385C12.385,9.541,11.314,8.472,9.999,8.472z M9.999,12.238c-0.76,0-1.38-0.622-1.38-1.382c0-0.761,0.62-1.38,1.38-1.38c0.761,0,1.38,0.62,1.38,1.38C11.379,11.616,10.76,12.238,9.999,12.238z"></path>
                  <path d="M15.232,5.375H9.398C9.159,4.366,8.247,3.61,7.174,3.61c-1.073,0-1.985,0.756-2.224,1.765H4.769c-1.246,0-2.259,1.012-2.259,2.257v6.499c0,1.247,1.014,2.259,2.259,2.259h10.464c1.244,0,2.258-1.012,2.258-2.259V7.632C17.49,6.387,16.477,5.375,15.232,5.375z M16.486,14.131c0,0.69-0.564,1.256-1.254,1.256H4.769c-0.692,0-1.256-0.565-1.256-1.256V7.632c0-0.691,0.563-1.254,1.256-1.254H5.39c0.275,0,0.499-0.221,0.502-0.495c0.01-0.7,0.585-1.269,1.282-1.269s1.272,0.569,1.282,1.269c0.003,0.274,0.228,0.495,0.502,0.495h6.275c0.689,0,1.254,0.563,1.254,1.254V14.131z"></path>
                </svg>
                <input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={onBackImgChange}
                />
              </label>
              <div className="edit_profile_img">
                <div className="edit_profile_img_circle">
                  <img
                    src={newProfile ? profileImg : userObj.photoURL}
                    alt="profile"
                  />
                  <label className="edit_profile_img_label">
                    <svg
                      className="edit_profile_camera_icon"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.999,8.472c-1.314,0-2.385,1.069-2.385,2.384c0,1.317,1.07,2.385,2.385,2.385c1.316,0,2.386-1.068,2.386-2.385C12.385,9.541,11.314,8.472,9.999,8.472z M9.999,12.238c-0.76,0-1.38-0.622-1.38-1.382c0-0.761,0.62-1.38,1.38-1.38c0.761,0,1.38,0.62,1.38,1.38C11.379,11.616,10.76,12.238,9.999,12.238z"></path>
                      <path d="M15.232,5.375H9.398C9.159,4.366,8.247,3.61,7.174,3.61c-1.073,0-1.985,0.756-2.224,1.765H4.769c-1.246,0-2.259,1.012-2.259,2.257v6.499c0,1.247,1.014,2.259,2.259,2.259h10.464c1.244,0,2.258-1.012,2.258-2.259V7.632C17.49,6.387,16.477,5.375,15.232,5.375z M16.486,14.131c0,0.69-0.564,1.256-1.254,1.256H4.769c-0.692,0-1.256-0.565-1.256-1.256V7.632c0-0.691,0.563-1.254,1.256-1.254H5.39c0.275,0,0.499-0.221,0.502-0.495c0.01-0.7,0.585-1.269,1.282-1.269s1.272,0.569,1.282,1.269c0.003,0.274,0.228,0.495,0.502,0.495h6.275c0.689,0,1.254,0.563,1.254,1.254V14.131z"></path>
                    </svg>
                    <input
                      className="hidden"
                      type="file"
                      accept="image/*"
                      onChange={onProfileImgChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="edit_profile_top_bot"></div>
        </div>
        <div className="edit_profile_bottom_wrapper">
          <div className="edit_profile_nickname_wrapper">
            <div className="edit_profile_nickname">
              <span>이름</span>
              <input
                onChange={onNickNameChange}
                type="text"
                value={newDisplayName}
              />
            </div>
          </div>
          <div className="edit_profile_state_msg_wrapper">
            <div className="edit_profile_state_msg">
              <span>상태 메세지</span>
              <textarea
                onChange={onStateMsgChange}
                type="text"
                value={newStateMsg}
              />
            </div>
          </div>
          테스트용
          <br />
          <br />
          <br />
          <br />
          <br />
          테스트용
          <br />
          <br />
          <br />
          <br />
          <br />
          테스트용
          <br />
          <br />
          <br />
          <br />
          <br />
          테스트용
          <br />
          <br />
          <br />
          <br />
          <br />
          테스트용
          <br />
          <br />
          <br />
          <br />
          <br />
          테스트용
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
