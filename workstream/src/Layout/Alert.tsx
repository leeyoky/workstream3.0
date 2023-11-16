import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import classes from './Alert.module.css';

interface AlertProps {
  title?: ReactNode;
  content?: ReactNode;
  message: string;
  onClose: () => void;
}

const Alert:React.FC<AlertProps> = (props) => {
  const { message, onClose } = props;
  const portalElement = document.getElementById('alert');

  useEffect(() => {
    const timer = setTimeout(() => {
      /* 알림 닫는 함수 */
    }, 5000); // 5초 후에 알림 닫기 

    return () => clearTimeout(timer);
  },[])

  if (!portalElement) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={classes.alertBox}>
      <div className={classes.alert}>
        <span className={classes.title}>
          <i className="fa-regular fa-circle-xmark"></i>
          <span>{props.title} Alert</span>
        </span>
        <div className={classes.message}>
{/*           {message} */}
          <span>
          제목을 입력해 주세요.
          </span>
        </div>

{/*       <button className={classes.closeButton} onClick={onClose}>
        닫기
      </button> */}
      </div>
    </div>,
    portalElement
  );
}

export default Alert