import { useEffect, useState } from 'react';
import Modal from '../../Layout/Modal/Modal';
import Attachment from '../Common/Attachment';
import { SwitchButton } from '../Common/SwitchButton';
import DatePick from '../DatePick';
import { fetchNotice } from '../../api/endpoints/notice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface CreateNoticeModalProps {
  onClose: () => void;
}
const CreateNoticeModal: React.FC<CreateNoticeModalProps> = props => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isPopup, setIsPopup] = useState('N');
  const regUser = useSelector((state: RootState) => state.user.userInfo.empNo);

  useEffect(() => {
    console.log(isPopup);
  }, [isPopup]);

  const closeModalHadler = () => {
    props.onClose();
  };

  const submitNotice = async () => {
    try {
      const formData = {
        title: title,
        content: content,
        regUsr: regUser,
        popupYn: isPopup,
        popupStart: startDate,
        popupEnd: endDate,
      };
      console.log(formData);
      const response = await fetchNotice(formData);

      if (response.status === 201) {
        props.onClose();
      } else {
        console.error('Failed to save notice:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving notice:', error);
    }
  };
  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const contentChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  const startDateChangeHandler = (date: Date | null) => {
    setStartDate(date);
  };
  const endDateChangeHandler = (date: Date | null) => {
    setEndDate(date);
  };

  return (
    <Modal isOpen={true} className="notice-modal">
      <div className="card">
        <div className="card__header">
          <p>새 글 작성</p>
          <hr />
        </div>
        <div className="card__wrapper">
          <div className="card__content">
            <span>제목</span>
            <input onChange={titleChangeHandler} value={title} />
            <span>내용</span>
            <textarea
              name="content"
              onChange={contentChangeHandler}
              value={content}
              spellCheck={false}
            />
            <div className="popup-wrapper">
              <span>팝업창 생성 여부</span>
              <SwitchButton
                value1="ON"
                value2="OFF"
                onButtonToggle={buttonNumber => {
                  setIsPopup(buttonNumber === 1 ? 'Y' : 'N');
                }}
              />
            </div>
            {isPopup === 'Y' && (
              <div className="popup-date-wrapper">
                <span>팝업 게시 기간</span>
                <DatePick
                  placeholderText="시작일"
                  dateFormat="yyyy-MM-dd"
                  onChange={startDateChangeHandler}
                  selected={startDate}
                />
                <p>~</p>
                <DatePick
                  placeholderText="종료일"
                  dateFormat="yyyy-MM-dd"
                  onChange={endDateChangeHandler}
                  selected={endDate}
                />
              </div>
            )}
          </div>
          <Attachment />
          <div className="card__button-box">
            <button className="btn btn-primary" onClick={submitNotice}>
              저장
            </button>
            <button className="btn" onClick={closeModalHadler}>
              취소
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateNoticeModal;
