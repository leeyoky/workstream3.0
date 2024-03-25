import { useEffect, useState } from 'react';
import Modal from '../../../Layout/Modal/Modal';
import formatDateTime from '../../../helpers/formatDateTime';

interface PopupData {
  id: string;
  title: string;
  content: string;
}

interface PopupModalProps {
  onClose: () => void;
  on7DaysClose: (popupId: string) => void;
  data: PopupData;
  className: string;
}

const PopupModal: React.FC<PopupModalProps> = props => {
  const { onClose, on7DaysClose, data, className } = props;
  // 노출 팝업의 true, false를 shouldShowPopup 함수를 통해 설정
  const [isOpen, setIsOpen] = useState(shouldShowPopup());

  const closeModalHandler = () => {
    setIsOpen(false);
    onClose();
  };

  const close7days = () => {
    const now = new Date();
    //현재 5분으로 조정
    const closeTime = new Date(now.getTime() + 5 * 60 * 1000);

    setIsOpen(false);
    on7DaysClose(data.id);

    localStorage.setItem(`popupCloseTime_${data.id}`, formatDateTime(closeTime.toISOString()));

    // closeTime이 경과하면 로컬스토리지에서 삭제
    setTimeout(
      () => {
        localStorage.removeItem(`popupCloseTime_${data.id}`);
      },
      1 * 60 * 1000,
    );
  };

  // 팝업을 보여주는 조건을 확인
  function shouldShowPopup(): boolean {
    const storedCloseTime = localStorage.getItem(`popupCloseTime_${data.id}`);

    if (!storedCloseTime) {
      // 정보가 없으면 팝업을 보여줌
      return true;
    }

    const currentDateTime = new Date();
    const closeTime = new Date(storedCloseTime);

    return currentDateTime > closeTime; // 현재 날짜와 시간이 저장된 닫은 시간보다 뒤라면 팝업을 보여줌
  }

  useEffect(() => {
    setIsOpen(shouldShowPopup());
  }, [data.id]);

  return (
    <Modal isOpen={isOpen} className={className} isDrag={true}>
      <div className="card">
        <div className="card__header"></div>
        <div className="card__wrapper">
          <div className="card__content">
            <span>{data.title}</span>
            <div>{data.content}</div>
          </div>
        </div>
        <div className="xmark_overhead">
          <div className="block-popup-check">
            <label htmlFor="">7일 간 보지 않기</label>
            <input type="checkbox" name="" id="" onClick={close7days} />
          </div>
          <div className="close-popup-box">
            <span>닫기</span>
            <i className="fa-solid fa-xmark" onClick={closeModalHandler}></i>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PopupModal;
