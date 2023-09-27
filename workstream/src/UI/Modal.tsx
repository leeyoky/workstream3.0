import React, { ReactNode, useState } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

interface ModalProps {
  children?: ReactNode;
  isOpen: boolean; // 모달의 열림/닫힘 상태를 받아오도록 수정
  onClose: () => void; // 모달 닫기 핸들러
}

const Modal: React.FC<ModalProps> = (props) => {
  const { isOpen, onClose } = props; // props에서 isOpen과 onClose를 추출

  const portalElement = document.getElementById('overlays');

  if (!portalElement || !isOpen) {
    return null; // 포털 엘리먼트가 없거나 모달이 닫혀있을 경우 처리
  }

  return ReactDOM.createPortal(
    <div>
      <div className={classes.backdrop} onClick={onClose}></div>
      <div className={classes.modal}>
        <div className={classes.content}>
          {props.children}
          <button className={classes['button--alt']} onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>,
    portalElement
  );
};

export default Modal;
