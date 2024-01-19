import { ChangeEvent, useEffect, useState } from 'react';
import BoardTitle from '../../Layout/BoardLayout/BoardTitle';
import DatePick from '../../components/DatePick';
import classes from './ApprovalMagager.module.css';
import ApprovalManagerProceed from '../../components/Approval/ApprovalSetting/ApprovalManagerProceed';
import ApprovalManagerHistory from '../../components/Approval/ApprovalSetting/ApprovalManagerHistory';
import OrganizationModal from '../../common/Modal/OrganizationModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { selectedActions } from '../../store/Approval/approval-slice';
import { approvalSettingActions } from '../../store/Approval/setting-slice';

const ApprovalManager = () => {
  const boardTitle = '전자결재 > 위임관리';
  const [isContentOpen, setIsContentOpen] = useState(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [reason, setReason] = useState('');
  const adversary = useSelector((state: RootState) => state.approval.approvers);
  const dispatch = useDispatch();

  useEffect(() => {
    // 추후 커스텀 훅에 넣을 것
    dispatch(selectedActions.resetArray());
  }, []);

  // 변경 버튼 누르면 기존 배열 삭제
  useEffect(() => {
    dispatch(selectedActions.setReference(false));
    if (openModal) {
      dispatch(selectedActions.removeAllEmps());
    }
  }, [openModal]);

  const openContentHandler = () => {
    setIsContentOpen(true);
  };
  const closeContentHandler = () => {
    setIsContentOpen(false);
  };
  const dateChangeHandler = (date: Date | null, type: string) => {
    if (type === 'start') {
      setStartDate(date);
      dispatch(approvalSettingActions.setStartDate(date));
    } else {
      setEndDate(date);
      dispatch(approvalSettingActions.setEndDate(date));
    }
  };
  const openEmpModal = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };

  const reasonChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    const length = inputValue.length;
    if (length > 200) {
      alert('200자를 초과할 수 없습니다');
      return;
    }
    setReason(inputValue);
    dispatch(approvalSettingActions.setprogressReason(inputValue));
  };

  return (
    <div className="page-wrapper setting-page">
      <BoardTitle title={boardTitle} />
      <div className={classes['setting-page-wrapper']}>
        <div className={classes['card']}>
          <div className={classes['card_title']}>
            <span>
              <i className="fa-solid fa-gear"></i>
              대결 관리
            </span>
            {isContentOpen ? (
              <button className="btn" onClick={closeContentHandler}>
                접기
                <i className="fa-solid fa-minus"></i>
              </button>
            ) : (
              <button className="btn btn-secondary-light" onClick={openContentHandler}>
                추가
                <i className="fa-solid fa-plus"></i>
              </button>
            )}
          </div>
          {isContentOpen && (
            <>
              <div className={classes['card-content']}>
                <div className={classes['icon-wrapper']}>
                  <i className="fa-solid fa-user-plus"></i>
                  <span>대결자 추가</span>
                </div>
                <div className={classes['card-content_left']}>
                  <div className={classes['content-wrapper']}>
                    <span className={classes['content-title']}>기간</span>
                    <div className={classes['datepick-wrapper']}>
                      <DatePick
                        placeholderText="시작일자"
                        selected={startDate}
                        onChange={date => dateChangeHandler(date, 'start')}
                        dateFormat="yyyy-MM-dd"
                      />
                      <span>~</span>
                      <DatePick
                        placeholderText="종료일자"
                        selected={endDate}
                        onChange={date => dateChangeHandler(date, 'end')}
                        dateFormat="yyyy-MM-dd"
                      />
                    </div>
                  </div>
                  <div className={classes['content-wrapper']}>
                    <span className={classes['content-title']}>대결자</span>
                    <div className={classes['emp-select-wrapper']}>
                      {adversary.length > 0 ? (
                        adversary.map((employee, index) => (
                          <div key={index}>
                            <span>
                              <span>[{employee.deptNm}]</span>
                              <span>{employee.name}</span>
                              <span>{employee.rankName}</span>
                            </span>
                            <button className="btn btn-border" onClick={openEmpModal}>
                              변경
                            </button>
                          </div>
                        ))
                      ) : (
                        <>
                          <button className="btn btn-border" onClick={openEmpModal}>
                            선택
                          </button>
                        </>
                      )}
                      {openModal && <OrganizationModal onClose={closeModal} />}
                    </div>
                  </div>
                </div>

                <div className={classes['reason-box']}>
                  <span className={classes['content-title']}>사유</span>
                  <div className={classes['reason-wrapper']}>
                    <textarea
                      spellCheck={false}
                      value={reason}
                      onChange={reasonChangeHandler}></textarea>
                  </div>
                </div>
                <div className={classes['button-wrapper']}>
                  <button className="btn btn-secondary">등록</button>
                </div>
              </div>
            </>
          )}
        </div>
        <ApprovalManagerProceed />
        <ApprovalManagerHistory />
      </div>
    </div>
  );
};

export default ApprovalManager;
