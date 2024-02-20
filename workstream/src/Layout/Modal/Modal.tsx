import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

interface ModalProps {
  children?: ReactNode;
  isOpen: boolean;
  isEdit?: boolean;
  className?: string;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = props => {
  const { isOpen, isEdit, className } = props;
  const portalElement = document.getElementById('overlays');

  if (!portalElement || !isOpen) {
    return null;
  }

  const modalClassName = isEdit
    ? `${classes.modal} ${classes.edit}`
    : `${classes.modal} ${className || ''}`;

  return ReactDOM.createPortal(
    <>
      <div className={classes.backdrop} onClick={props.onClose}></div>
      <div className={modalClassName}>
        <div className={classes.content}>{props.children}</div>
      </div>
    </>,
    portalElement,
  );
};

export default Modal;
