import { useEffect, useRef, useState } from 'react';
import { formatDateOnly } from '../../helpers/formatDateTime';
import { getCategoryLabel, noticeCategories } from '../../pages/Notice/NoticePageTag';

import Modal from '../../Layout/Modal/Modal';
import DatePick from '../DatePick';
import SwitchButton from '../Common/SwitchButton';
import useNoticeRequest from './../../hooks/Notice/useNoticeRequest';
import useUpdateFiles from '../../hooks/Common/useUpdateFiles';

interface DetailNoticeModalProps {
  noticeId: string;
  onClose: () => void;
}
const DetailNoticeModal: React.FC<DetailNoticeModalProps> = props => {
  const {
    isTemp,
    noticeData,
    getData,
    popupYn,
    setPopupYn,
    removeNotice,
    updateData,
    setNoticeData,
  } = useNoticeRequest(props.noticeId, () => getData());
  const [updateMode, setUpdateMode] = useState(false);
  const { getFileList /* apiFileList */ } = useUpdateFiles();

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isTemp) {
      setUpdateMode(true);
    }
  }, [isTemp]);

  useEffect(() => {
    getData();
    getFileList(props.noticeId);
  }, [props.noticeId]);

  useEffect(() => {
    if (updateMode && titleRef.current) {
      titleRef.current.focus();
    }
  }, [updateMode]);

  const closeModalHandler = () => {
    props.onClose();
  };

  const updateChangeMode = () => {
    setUpdateMode(true);
  };

  const updateModeHandler = async () => {
    setUpdateMode(true);

    const result = window.confirm('수정하시겠습니까?');

    if (result) {
      const currentDate = new Date(); // 현재 시간을 나타내는 Date 객체 생성
      const formattedDate = currentDate.toISOString(); // ISO 형식의 문자열로 변환

      setNoticeData(prevData => ({
        ...prevData!,
        popupYn: popupYn,
        state: 'SAVE',
        regDate: formattedDate,
      }));

      props.onClose();

      if (noticeData) {
        await updateData(props.noticeId, {
          ...noticeData,
          popupYn: popupYn,
          state: 'SAVE',
          regDate: formattedDate,
        });
      }

      setUpdateMode(false);
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
        popupEnd: date ? formatDateOnly(date.toISOString()) : '', // Date를 string으로 변환
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
                {updateMode ? (
                  <SwitchButton
                    value1="ON"
                    value2="OFF"
                    defaultValue={noticeData?.popupYn}
                    onButtonToggle={buttonNumber => {
                      setPopupYn(buttonNumber === 1 ? 'Y' : 'N');
                    }}
                  />
                ) : (
                  <div>{noticeData?.popupYn === 'Y' ? 'ON' : 'OFF'}</div>
                )}
              </div>
              {updateMode ? (
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
                    selected={noticeData?.popupEnd ? new Date(noticeData.popupEnd) : null}
                  />
                </div>
              ) : (
                noticeData?.popupYn === 'Y' && (
                  <div className="popup-date-wrapper">
                    <span>팝업 게시 기간</span>
                    <div>{formatDateOnly(noticeData?.popupStart)}</div>
                    <p>~</p>
                    <div>{formatDateOnly(noticeData?.popupEnd)}</div>
                  </div>
                )
              )}
            </>
          </div>
          {/* <Attachment fileData={apiFileList} updateMode={updateMode} /> */}
          <div className="card__button-box">
            {updateMode ? (
              <>
                <button className="btn btn-secondary" onClick={updateModeHandler}>
                  수정완료
                </button>
                <button className="btn btn-border" onClick={updateModeHandler}>
                  임시저장
                </button>
              </>
            ) : (
              <button className="btn btn-border" onClick={updateChangeMode}>
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
