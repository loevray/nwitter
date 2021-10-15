import React, { useRef } from "react";
import { useEffect } from "react";
import "./Modal.css";

const Modal = ({ setModalOn, onModalBtnClick, size, clipboardText }) => {
  const modalContainer = useRef();
  useEffect(() => {
    console.log(size);
    const modalOff = (e) => {
      if (
        !modalContainer.current.contains(e.target) ||
        e.target.className === "modal_off_btn"
      ) {
        setModalOn(false);
      }
    };
    document.body.addEventListener("mousedown", modalOff);
    return () => {
      document.body.removeEventListener("mousedown", modalOff);
    };
  }, []);
  return (
    <div className="modal_wrapper">
      <div
        ref={modalContainer}
        className="modal_container"
        style={{ width: `${size.width}`, height: `${size.height}` }}
      >
        <div className="modal_items">
          <span>하이</span>
          <button
            className="modal_event_btn"
            data-clipboard-text={clipboardText}
            onClick={onModalBtnClick}
          >
            이벤트용
          </button>
          <button className="modal_off_btn">끄기</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
