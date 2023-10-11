import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

interface ModalProps {
  children?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  isEdit?: boolean;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { isOpen, onClose, isEdit } = props;
  const portalElement = document.getElementById('overlays');

  if (!portalElement || !isOpen) {
    return null;
  }

  const modalClassName = isEdit ? `${classes.modal} ${classes.edit}` : classes.modal;

  return ReactDOM.createPortal(
    <div>
      <div className={classes.backdrop}></div>
      <div className={modalClassName}>
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
