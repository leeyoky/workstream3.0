import React, { ReactNode, useRef } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
import Draggable from 'react-draggable';

interface ModalProps {
  children?: ReactNode;
  isOpen: boolean;
  isEdit?: boolean;
  isDrag?: boolean;
  className?: string;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = props => {
  const { isOpen, isEdit, isDrag, className } = props;
  const portalElement = document.getElementById('overlays');
  const modalRef = useRef<HTMLDivElement>(null);

  if (!portalElement || !isOpen) {
    return null;
  }

  const modalClassName = isEdit
    ? `${classes.modal} ${classes.edit}`
    : `${classes.modal} ${className || ''}`;

  const draggableModal = isDrag ? (
    <Draggable nodeRef={modalRef}>
      <div className={modalClassName}>
        <div className={classes.content} ref={modalRef}>
          {props.children}
        </div>
      </div>
    </Draggable>
  ) : (
    <div className={modalClassName}>
      <div className={classes.content} ref={modalRef}>
        {props.children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    <>
      <div className={classes.backdrop} onClick={props.onClose}></div>
      {draggableModal}
    </>,
    portalElement,
  );
};

export default Modal;
