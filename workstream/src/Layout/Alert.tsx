import { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import classes from './Alert.module.css';

interface AlertProps {
  title?: ReactNode;
  content?: ReactNode;
  message: string | null;
  onClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  type: 'confirm' | 'alert'; // 추가: 확인/취소 버튼이 있는지 여부
  response?: boolean; // 추가: API 응답 여부
}

const Alert: React.FC<AlertProps> = (props) => {
  const { message, onClose, onConfirm, onCancel, type, response } = props;
  const [isModalOpen, setIsModalOpen] = useState(true);
  const portalElement = document.getElementById('alert');
  
  const handleConfirm = () => {
    setIsModalOpen(false);
    onConfirm && onConfirm(); // onConfirm이 존재하면 호출
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    onCancel && onCancel(); // onCancel이 존재하면 호출
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000); // 20초 후에 알림 닫기

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!portalElement) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={classes.alertBox}>
      <div className={`${classes} ${type === 'alert' ? classes.alert : classes.confirm }`}>
        {response !== undefined ? (
          // response가 정의되어 있을 때 (API 응답이 있는 경우)
          <div className={classes.response}>
            <span className={classes.title}>
              {response ? (
                <i className="fa-regular fa-circle-check"></i>
              ) : (
                <i className="fa-regular fa-circle-xmark"></i>
              )}
              <span>{response ? 'Success' : 'Failure'}</span>
            </span>
            <div className={classes.message}>
              <span>{message}</span>
            </div>
          </div>
        ) : (
          // response가 없는 경우
          <>
            <div className={classes.messageBox}>
              <div className={classes.message}>
                <i className="fa-solid fa-circle-exclamation"></i>
                <span>{message}</span>
              </div>
            </div>
            <div className={classes.buttonBox}>
              {type === 'alert' && (
                <>
                  <button 
                    className={`${classes.closeButton} ${classes.confirmButton}`} 
                    onClick={() => { handleConfirm(); onConfirm && onConfirm(); }}>
                    확인
                  </button>
                  <button 
                    className={`${classes.closeButton} ${classes.cancelButton}`} 
                    onClick={() => { handleCancel(); onCancel && onCancel(); }}>
                    취소
                  </button>
                </>
              )}
              {type === 'confirm' && (
                <button className={`${classes.closeButton} ${classes.confirmButton}`} onClick={onClose}>
                  확인
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>,
    portalElement
  );
}

export default Alert;
