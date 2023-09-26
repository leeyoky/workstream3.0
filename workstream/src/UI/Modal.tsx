import React, { ReactNode, useState } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

interface ModalProps {
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = (props) => {
  const [onModal, setOnModal] = useState(false);

  const showModalHandler = () => {
    setOnModal(true);
  }

  const hideModalHandler = () => {
    setOnModal(false);
  }

  const portalElement = document.getElementById('overlays');

  if (!portalElement) {
    return null; // 포털 엘리먼트가 없을 경우 처리
  }

  return (
    <React.Fragment>
      <div className="button-box">
        <button className="write-btn" onClick={showModalHandler}>결재 작성</button>
      </div>

      {onModal && ReactDOM.createPortal(
        <div>
          <div className={classes.backdrop} onClick={hideModalHandler}></div>
          <div className={classes.modal}>
            <div className={classes.content}>
              {props.children}
              <button className={classes['button--alt']} onClick={hideModalHandler}>
                Close
              </button>
            </div>
          </div>
        </div>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
