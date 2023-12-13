import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

interface ModalProps {
  children?: ReactNode;
  isOpen: boolean;
  isEdit?: boolean;
  className?: string;
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
    <div>
      <div className={classes.backdrop}></div>
      <div className={modalClassName}>
        <div className={classes.content}>{props.children}</div>
      </div>
    </div>,
    portalElement,
  );
};

export default Modal;
