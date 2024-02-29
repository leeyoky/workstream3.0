import { useEffect, useRef, useState } from 'react';

import { formatDateOnly } from '../../helpers/formatDateTime';

import SwitchButton from '../Common/SwitchButton';
import Modal from '../../Layout/Modal/Modal';
import DatePick from '../DatePick';
import Attachment from '../Common/Attachment';
import useNoticeRequest from './../../hooks/Notice/useNoticeRequest';
import { getCategoryLabel, noticeCategories } from '../../pages/Notice/NoticePageTag';

interface DetailNoticeModalProps {
  noticeId: string;
  onClose: () => void;
}
const DetailNoticeModal: React.FC<DetailNoticeModalProps> = props => {
  const { noticeData, getData, popupYn, setPopupYn, removeNotice, updateData, setNoticeData } =
    useNoticeRequest(props.noticeId, () => getData());
  const [updateMode, setUpdateMode] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getData();
  }, [props.noticeId]);

  const closeModalHandler = () => {
    props.onClose();
  };

  useEffect(() => {
    if (updateMode && titleRef.current) {
      titleRef.current.focus();
    }
  }, [updateMode]);

  const updateModeHandler = () => {
    setUpdateMode(true);
    if (updateMode && window.confirm('수정하시겠습니까?')) {
      setUpdateMode(false);
      props.onClose();
      if (noticeData) {
        updateData(props.noticeId, noticeData);
      }
    }
  };

  const categoryChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNoticeData(prevData => ({
      ...prevData!,
      category: event.target.value,
    }));
  };

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoticeData(prevData => ({
      ...prevData!,
      title: event.target.value,
    }));
  };

  const contentChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoticeData(prevData => ({
      ...prevData!,
      content: event.target.value,
    }));
  };

  const startDateChangeHandler = (date: Date | null) => {
    setNoticeData(prevData => {
      if (!prevData) {
        return prevData; // 이전 데이터가 없으면 그대로 반환
      }

      return {
        ...prevData,
        popupStart: date ? formatDateOnly(date.toISOString()) : '',
      };
    });
  };

  const endDateChangeHandler = (date: Date | null) => {
    setNoticeData(prevData => {
      if (!prevData) {
        return prevData; // 이전 데이터가 없으면 그대로 반환
      }
      return {
        ...prevData,
        popupEnd: date ? date.toISOString() : '', // Date를 string으로 변환
      };
    });
  };

  const deleteNoticeHandler = (id: string) => {
    const result = window.confirm('글을 삭제하시겠습니까?');
    if (result) {
      removeNotice(id);
    }
  };

  return (
    <Modal isOpen={true} className="notice-modal" onClose={closeModalHandler}>
      <div className="card">
        <div className="card__header">
          <div>
            <p>공지사항</p>
            <div className="edit__buttons">
              <button
                className="btn btn-red-line"
                onClick={() => deleteNoticeHandler(props.noticeId)}>
                삭제
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
          <hr />
        </div>
        <div className="card__wrapper">
          <div className="card__content">
            <span>문서 분류</span>
            {updateMode ? (
              <select onChange={categoryChangeHandler} value={noticeData?.category}>
                {noticeCategories.map(category => (
                  <option key={category.code} value={category.code}>
                    {category.value}
                  </option>
                ))}
              </select>
            ) : (
              <div className="card__title__detail">{getCategoryLabel(noticeData?.category)}</div>
            )}
            <span>제목</span>
            {updateMode ? (
              <input
                spellCheck={false}
                ref={titleRef}
                onChange={titleChangeHandler}
                value={noticeData?.title}
              />
            ) : (
              <div className="card__title__detail">{noticeData?.title}</div>
            )}
            <span>내용</span>
            {updateMode ? (
              <textarea
                name="content"
                onChange={contentChangeHandler}
                value={noticeData?.content}
                spellCheck={false}
              />
            ) : (
              <div className="card__content__detail">{noticeData?.content}</div>
            )}
            <>
              <div className="popup-wrapper">
                <span>팝업창 생성 여부</span>
                <SwitchButton
                  value1="ON"
                  value2="OFF"
                  defaultValue={popupYn}
                  onButtonToggle={buttonNumber => {
                    setPopupYn(buttonNumber === 1 ? 'Y' : 'N');
                  }}
                />
              </div>
              {popupYn === 'Y' && (
                <div className="popup-date-wrapper">
                  <span>팝업 게시 기간</span>
                  <DatePick
                    placeholderText="시작일"
                    dateFormat="yyyy-MM-dd"
                    onChange={startDateChangeHandler}
                    selected={noticeData?.popupStart ? new Date(noticeData.popupStart) : null}
                  />
                  <p>~</p>
                  <DatePick
                    placeholderText="종료일"
                    dateFormat="yyyy-MM-dd"
                    onChange={endDateChangeHandler}
                    selected={noticeData?.popupStart ? new Date(noticeData.popupEnd) : null}
                  />
                </div>
              )}
            </>
          </div>
          <Attachment />
          <div className="card__button-box">
            {updateMode ? (
              <button className="btn btn-secondary" onClick={updateModeHandler}>
                수정완료
              </button>
            ) : (
              <button className="btn btn-border" onClick={updateModeHandler}>
                수정
              </button>
            )}
            <button className="btn" onClick={closeModalHandler}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DetailNoticeModal;
