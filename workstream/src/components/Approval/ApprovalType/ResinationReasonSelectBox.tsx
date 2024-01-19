import { useEffect, useState } from 'react';
import { updateResignReason } from '../../../api/axios';
import { resignationReason } from '../../../pages/Approval/ApprovalSearchTag';
import classes from '../../../pages/Approval/Approval.module.css';
import { resignReasonSelectData } from '../../../types/Approval/Approaval';
import { useDispatch } from 'react-redux';
import { selectedActions } from '../../../store/Approval/approval-slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

/**
 * 퇴직 사유 selectBox
 * @returns
 */

type ResinationReasonSelectBoxProps = {
  reasonCd?: string;
  reasonValue?: string;
};

const ResinationReasonSelectBox: React.FC<ResinationReasonSelectBoxProps> = () => {
  // api에서 가져온 값
  const [reasons, setReasons] = useState<resignReasonSelectData[]>([]);
  // 첫번째 셀렉트 박스 값
  const [selectedAtt1, setSelectedAtt1] = useState('');
  // 두번째 셀렉트 박스 값
  const [reasonsForSelectedAtt1, setReasonsForSelectedAtt1] = useState<resignReasonSelectData[]>(
    [],
  );
  const detailMode = useSelector((state: RootState) => state.approval.isDetailMode);
  // 두번째 셀렉트 박스의 선택된 코드 값
  const [reasonsValue, setReasonsValue] = useState('');
  // 퇴직사유 입력 값
  const [reasonRetirement, setReasonRetirement] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const updatedResignReason = async () => {
      try {
        const response = await updateResignReason();
        const data: resignReasonSelectData[] = response.data;
        setReasons(data);
        console.log('reason Data:', data);
        // 처음 마운트될 때의 로직 추가
        if (data.length > 0 && detailMode) {
          const defaultAttr1Value = data[0].attr1;
          setSelectedAtt1(defaultAttr1Value);

          // 해당 attr1 값에 따른 이유들 추출 및 설정
          const filteredReasons = data.filter(reason => reason.attr1 === defaultAttr1Value);
          setReasonsForSelectedAtt1(filteredReasons);

          // 이유들 중 첫 번째 항목의 코드 값 설정
          if (filteredReasons.length > 0) {
            const defaultReasonValue = filteredReasons[0].code;
            setReasonsValue(defaultReasonValue);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    updatedResignReason();
  }, []);

  /**
   * 퇴직사유 첫번째 selectBox 클릭 이벤트
   * @param e
   */
  const att1ChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAtt1Value = e.target.value;
    // 첫번째 셀렉트박스 value 세팅
    setSelectedAtt1(selectedAtt1Value);
    // 선택한 att1에 맞는 이유들을 추출 하여 두번째 셀렉트박스에 설정
    const filteredReasons = reasons.filter(reason => reason.attr1 === selectedAtt1Value);
    setReasonsForSelectedAtt1(filteredReasons);
    // 다른 상태 초기화
    setReasonsValue('');
    dispatch(selectedActions.setReasonRitire(''));
  };

  /**
   * 퇴직사유 두번째 selectBox 클릭 이벤트
   * @param e
   */
  const setReasonCdHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setReasonsValue(selectedValue);
    console.log('selectedValue : ', selectedValue);

    dispatch(selectedActions.setReasonCd(selectedValue));
    dispatch(selectedActions.setReasonRitire(''));
  };

  /* 퇴직 사유 입력 */
  const exitChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const reasonRetirement = e.target.value;
    const newLength = reasonRetirement.length;

    // 150자를 초과하면 알림 표시
    if (newLength > 150) {
      alert('퇴직사유는 150자를 초과할 수 없습니다.');
      return;
    }
    setReasonRetirement(reasonRetirement);
    dispatch(selectedActions.setReasonRitire(reasonRetirement));
  };

  return (
    <div className={classes['resignation-reasons-select-wrapper']}>
      <select onChange={att1ChangeHandler} value={selectedAtt1}>
        <option value="">선택</option>
        {resignationReason.map(reason => (
          <option key={reason.code} value={reason.attr1}>
            {reason.attr1}
          </option>
        ))}
      </select>
      {selectedAtt1 !== '직접입력' ? (
        <select onChange={setReasonCdHandler} value={reasonsValue}>
          <option value="">선택</option>
          {reasonsForSelectedAtt1.map(reason => (
            <option key={reason.code} value={reason.code}>
              {reason.value}
            </option>
          ))}
        </select>
      ) : (
        <textarea
          placeholder="10자 이상 입력해주세요."
          spellCheck={false}
          className={classes['body-table__input']}
          onChange={exitChangeHandler}
          value={reasonRetirement}></textarea>
      )}
    </div>
  );
};

export default ResinationReasonSelectBox;
