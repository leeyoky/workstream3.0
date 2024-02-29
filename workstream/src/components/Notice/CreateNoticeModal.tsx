import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import { SwitchButton } from '../Common/SwitchButton';
import { fetchNotice } from '../../api/endpoints/notice';

import Modal from '../../Layout/Modal/Modal';
import DatePick from '../DatePick';
import Attachment from '../Common/Attachment';
import { noticeCategories } from '../../pages/Notice/NoticePageTag';
interface CreateNoticeModalProps {
  onClose: () => void;
}
const CreateNoticeModal: React.FC<CreateNoticeModalProps> = props => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState('NOTICE01');
  const [content, setContent] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isPopup, setIsPopup] = useState('N');
  const regUser = useSelector((state: RootState) => state.user.userInfo.empNo);

  const closeModalHadler = () => {
    props.onClose();
  };

  const categoryChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const submitNotice = async (value: string) => {
    let status = '';

    if (value === 'SAVE') {
      status = 'SAVE';
    } else if (value === 'TEMP') {
      status = 'TEMP';
    }

    const result = window.confirm(`${status === 'SAVE' ? '저장' : '임시저장'} 하시겠습니까?`);

    if (!result) {
      return;
    }

    try {
      const formData = {
        title: title,
        status: status,
        category: category,
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
            <span>문서 분류</span>
            <select onChange={categoryChangeHandler} value={category}>
              {noticeCategories.map(category => (
                <option key={category.code} value={category.code}>
                  {category.value}
                </option>
              ))}
            </select>
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
            <button className="btn btn-primary" onClick={() => submitNotice('SAVE')}>
              저장
            </button>
            <button className="btn btn-border" onClick={() => submitNotice('TEMP')}>
              임시저장
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
