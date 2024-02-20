import { useEffect, useState } from 'react';
import Modal from '../../Layout/Modal/Modal';
import { getNoticeData } from '../../api/endpoints/notice';
import { NoticeList } from '../../types/Main/Main';
import DatePick from '../DatePick';

interface DetailNoticeModalProps {
  noticeId: string;
  onClose: () => void;
}
const DetailNoticeModal: React.FC<DetailNoticeModalProps> = props => {
  const [noticeData, setNoticeData] = useState<NoticeList>([]);

  useEffect(() => {
    getData();
  }, [props.noticeId]);

  const getData = async () => {
    try {
      const response = await getNoticeData(props.noticeId);
      const data = response.data;
      console.log(data);
      setNoticeData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModalHadler = () => {
    props.onClose();
  };
  return (
    <Modal isOpen={true} className="notice-modal">
      <div className="card">
        <div className="card__header">
          <p>공지사항</p>
          <hr />
        </div>
        <div className="card__wrapper">
          <div className="card__content">
            <span>{noticeData.title}</span>
            <span>{noticeData.content}</span>
            <div className="popup-wrapper">
              <span>팝업창 생성 여부</span>
              {/*               <SwitchButton
                value1="ON"
                value2="OFF"
                onButtonToggle={buttonNumber => {
                  setIsPopup(buttonNumber === 1 ? 'Y' : 'N');
                }}
              /> */}
            </div>
            {/* {isPopup === 'Y' && ( */}
            <div className="popup-date-wrapper">
              <span>팝업 게시 기간</span>
              <DatePick
                placeholderText="시작일"
                dateFormat="yyyy-MM-dd"
                /*               onChange={startDateChangeHandler}
              selected={startDate} */
              />
              <p>~</p>
              <DatePick
                placeholderText="종료일"
                dateFormat="yyyy-MM-dd"
                /*               onChange={endDateChangeHandler}
              selected={endDate} */
              />
            </div>
            {/*             )} */}
          </div>
        </div>
        <div className="card__button-box">
          <button className="btn btn-primary">저장</button>
          <button className="btn" onClick={closeModalHadler}>
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DetailNoticeModal;
