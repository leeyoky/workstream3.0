import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { selectedActions } from './../../store/Approval/approval-slice';
import {
  deleteDocument,
  fetchApprovalData,
  fetchExecutionData,
  fetchFileData,
  fetchRecallDocument,
  fetchResignationData,
  updateDocument,
  updateResignation,
} from '../../api/axios';
import { AxiosError } from 'axios';
import { userActions } from '../../store/User/user-slice';
import { uiActions } from '../../store/ui-slice';
import { fileActions } from '../../store/file-slice';
import { resinationDocData } from '../../types/Approval/Approaval';

const useApprovalRequest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefModalOpen, setIsRefModalOpen] = useState(false);
  const [isDetail, setIsDetail] = useState(true);
  const { id = '' } = useParams<string>();
  const userData = useSelector((state: RootState) => state.user);
  const approvers = useSelector((state: RootState) => state.approval.approvers);
  const fileData = useSelector((state: RootState) => state.file.files);
  const files = useSelector((state: RootState) => state.file);
  const data = useSelector((state: RootState) => state.approval);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowModal = () => {
    setIsModalOpen(true);
    dispatch(selectedActions.setReference(false));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleShowRefModal = () => {
    setIsRefModalOpen(true);
    dispatch(selectedActions.setReference(true));
  };
  const handleCloseRefModal = () => setIsRefModalOpen(false);

  useEffect(() => {
    setIsDetail(false);
  }, [isDetail]);

  /**
   * 문서함 이동
   */
  const goBackPage = () => {
    const isCancle = window.confirm('작업한 모든 문서의 정보를 잃게됩니다. 취소하시겠습니까?');
    if (isCancle) {
      navigate('/approval/document');
      dispatch(selectedActions.resetArray());
    }
  };

  /**
   * 시행문 생성
   * @param id
   * @param executeDate
   */
  const goCreateExecution = (id: string) => {
    console.log('files : ', files);

    const confirmMsg = window.confirm('해당 문서의 시행문을 생성하시겠습니까?');
    if (confirmMsg) {
      dispatch(selectedActions.updateDocumentType('EXECUTION'));
      navigate('/approval/create', {
        state: {
          isCreate: true,
          documentId: id,
          executeDate: data.executeDate,
          content: data.content,
          title: data.title,
        },
      });
    }
  };

  /**
   * 문서 회수
   * @param id
   */
  const recallDocument = async (id: string) => {
    const confirmMsg = window.confirm('문서를 회수하시겠습니까?');
    if (confirmMsg) {
      try {
        const response = await fetchRecallDocument(id);
        if (response.status === 204) {
          alert('문서 회수에 성공했습니다.');
          navigate('/approval/temporary');
          dispatch(uiActions.selectMenu('/approval/temporary'));
        }
      } catch (error: any) {
        if ((error as AxiosError).response?.status === 400) {
          alert('진행 중인 결재문서는 회수 불가합니다.');
        }
        console.log(error);
      }
    }
  };
  /**
   * 완료, 반려 문서를 재기안 하는 기능
   * @param reqestType
   * @param isEdit {true}
   * @param isDetail {false}
   */
  const changeTempModeHandler = (reqestType: 'Y' | 'N') => {
    if (reqestType === 'Y') {
      dispatch(selectedActions.setIsReviseMode(true));
      dispatch(fileActions.resetFiles());
      dispatch(fileActions.resetServerFiles());
    } else {
      dispatch(selectedActions.setIsReviseMode(false));
    }
  };

  /**
   * 결재요청
   * @param documentType 문서종류
   * @param requestType 임시저장/결재요청
   */

  const requestApprovalType = (
    documentType: string,
    requestType: 'PROCEEDING' | 'TEMP' | 'APPROVED',
  ) => {
    if (documentType === 'APPROVAL_COMMON') {
      requestApprovalHandler(requestType);
    } else if (documentType === 'RESIGNATION') {
      requestResinationHandler(requestType);
    } else if (documentType === 'EXECUTION') {
      requestExecutionHandler(requestType);
    }
  };

  /**
   *  결재요청 - 기본 품의서
   */

  const requestApprovalHandler = async (requestType: 'PROCEEDING' | 'TEMP' | 'APPROVED') => {
    if (data.title === '') {
      alert('문서의 제목을 입력하지 않았습니다.');
      return;
    }
    if (data.content === '') {
      alert('내용이 비어있습니다.');
      return;
    }
    if (data.approvers.length === 0) {
      alert('결재자가 선택되지 않았습니다');
      return;
    }

    // 임시저장/결재요청 여부
    const confirmMsg = `${
      requestType === 'PROCEEDING' ? '결재 요청하시겠습니까?' : '임시 저장하시겠습니까?'
    }`;
    if (window.confirm(confirmMsg)) {
      const newApprovers = approvers.map(employee => {
        return {
          apprType: employee.approvalType,
          approver: employee.empNo,
          deferredYn: employee.deferredYn,
          overrideYn: employee.overrideYn,
          order: employee.order as number,
        };
      });
      try {
        const formData = {
          ccDept: data.ccDept.map(dept => dept.deptCd),
          ccUser: data.ccUser.map(emp => emp.empNo),
          title: data.title,
          executeDate: data.executeDate,
          docType: data.documentType,
          line: newApprovers,
          contents: data.content,
          state: requestType, // 이 부분을 requestType에 따라 설정
        };
        console.log('formData', formData);

        const response = await fetchApprovalData(formData);
        const responseData = response.data;

        if (response.status === 201) {
          if (fileData.length > 0) {
            // 파일 데이터가 있는 경우에만 실행
            await fetchFileHandler(responseData.id);
          }
          if (requestType === 'PROCEEDING') {
            alert('결재요청에 성공했습니다.');
          } else {
            alert('임시저장에 성공했습니다.');
          }

          navigate(`/approval/detail/${responseData.id}`);
          setIsDetail(true);
        }
        dispatch(selectedActions.resetArray());
        dispatch(userActions.resetArray());
        dispatch(fileActions.resetServerFiles());
        dispatch(fileActions.resetFiles());
      } catch (error) {
        console.error(error);
      }
    }
  };

  /**
   * 결재요청 - 사직원
   * @param requestType
   * @returns
   */

  const requestResinationHandler = async (requestType: 'PROCEEDING' | 'TEMP' | 'APPROVED') => {
    // 임시저장, 결재요청의 여부
    const confirmMsg = `${
      requestType === 'PROCEEDING' ? '결재 요청하시겠습니까?' : '임시 저장하시겠습니까?'
    }`;
    if (data.approvers.length === 0) {
      alert('결재자가 선택되지 않았습니다');

      return;
    }

    if (userData.userSSN === null) {
      alert('주민번호가 입력되지 않았습니다.');
      return;
    }

    if (data.retireDate === '') {
      alert('퇴사일자를 입력하지 않았습니다.');
      return;
    }
    if (userData.address === '') {
      alert('주소가 입력되지 않았습니다');
      console.log(data.reasonRetire.trim().length);
      return;
    }

    if (userData.mobilePhone === '') {
      alert('휴대폰 연락처가 입력되지 않았습니다.');
      return;
    }
    if (data.reasonCd === '') {
      alert('퇴직 사유를 선택해 주세요.');
      return;
    }

    if (data.reasonRetire) {
      if (data.reasonRetire === '') {
        alert('퇴직 사유를 입력해 주십시오.');
        return;
      }
      if (data.reasonRetire.trim().length < 10) {
        alert('퇴직 사유를 10자 이상 입력해 주십시오.');
        return;
      }
    }

    if (data.finalSign === false) {
      alert('아래의 서명을 하지 않았습니다.');
      return;
    }

    if (window.confirm(confirmMsg)) {
      // 합의 방식이 병렬인 경우 같은 order 부여
      const newApprovers = approvers.map(employee => {
        return {
          apprType: employee.approvalType,
          approver: employee.empNo,
          deferredYn: employee.deferredYn,
          overrideYn: employee.overrideYn,
          order: employee.order as number,
        };
      });

      try {
        const docData = {
          ccDept: data.ccDept.map(dept => dept.deptCd),
          ccUser: data.ccUser.map(emp => emp.empNo),
          address: userData.address,
          homeContact: userData.homePhone ? userData.homePhone : null,
          identityNo: userData.userSSN,
          mobileContact: userData.mobilePhone,
          reasons: data.reasonRetire,
          reasonCd: data.reasonCd,
          resignationDate: data.retireDate,
          line: newApprovers,
          state: requestType, // 이 부분을 requestType에 따라 설정
        };

        const response = await fetchResignationData(docData as resinationDocData);
        const responseData = response.data;

        if (response.status === 201) {
          if (fileData.length > 0) {
            // 파일 데이터가 있는 경우에만 실행
            await fetchFileHandler(responseData.id);
          }
          if (requestType === 'PROCEEDING') {
            alert('결재요청에 성공했습니다.');
          } else {
            alert('임시저장에 성공했습니다');
          }
          setIsDetail(true);
          navigate(`/approval/detail/${responseData.id}`);
          dispatch(selectedActions.resetArray());
          dispatch(selectedActions.resetResination());
          dispatch(userActions.resetArray());
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  /**
   * 시행문 결재요청
   * @param documentId
   */

  const requestExecutionHandler = async (requestType: 'PROCEEDING' | 'TEMP' | 'APPROVED') => {
    console.log('시행문 결재요청');
    // 임시저장, 결재요청의 여부

    const confirmMsg = `${
      requestType === 'APPROVED' ? '시행문을 발행하시겠습니까?' : '임시 저장하시겠습니까?'
    }`;

    if (data.ccId === '') {
      alert('참조 문서를 선택하여 정보를 불러와주세요.');
      return;
    }
    if (data.recipient === '') {
      alert('수신처가 입력되지 않았습니다.');
      return;
    }

    if (window.confirm(confirmMsg)) {
      try {
        const formData = {
          title: data.title,
          recipient: data.recipient,
          ccId: data.ccId,
          executeDate: data.executeDate,
          contents: data.content,
          state: requestType,
        };

        const response = await fetchExecutionData(formData);
        console.log(response.data);

        if (response.status === 201) {
          if (requestType === 'APPROVED') {
            alert('시행문 발행을 성공했습니다.');
          } else {
            alert('임시저장에 성공했습니다.');
          }

          navigate(`/approval/detail/${response.data.id}`);
          setIsDetail(true);
        }
        dispatch(selectedActions.resetArray());
      } catch (error) {
        console.error(error);
      }
    }
  };

  // 첨부파일 업데이트
  const fetchFileHandler = async (documentId: string) => {
    const formData = new FormData();

    // fileData 정보를 formData에 추가
    fileData.forEach(file => {
      formData.append('files', file);
    });

    formData.append('docNumber', documentId);
    formData.append('docType', 'APPROVAL');

    try {
      const response = await fetchFileData(formData);
      const data = response.data;
      console.log('fileData', data);
    } catch (error) {
      console.log(error);
    }
  };

  const requestTempDocument = (
    documentType: string,
    requestType: 'PROCEEDING' | 'TEMP' | 'APPROVED',
  ) => {
    if (documentType === 'APPROVAL_COMMON') {
      updateDocumentHandler(requestType);
    } else if (documentType === 'RESIGNATION') {
      updateResignationHandler(requestType);
    }
  };

  /**
   * 기본 품의서 임시저장
   * @param requestType
   * @returns
   */
  const updateDocumentHandler = async (requestType: 'PROCEEDING' | 'TEMP' | 'APPROVED') => {
    const confirmMsg = `${
      requestType === 'PROCEEDING' ? '결재 요청하시겠습니까?' : '임시 저장하시겠습니까?'
    }`;

    if (window.confirm(confirmMsg)) {
      const newApprovers = approvers.map(employee => ({
        apprType: employee.approvalType,
        approver: employee.empNo,
        deferredYn: employee.deferredYn,
        overrideYn: employee.overrideYn,
        order: employee.order as number,
      }));

      if (data.title === '') {
        alert('문서의 제목을 입력하지 않았습니다.');
        return;
      }
      if (data.content === '') {
        alert('내용이 비어있습니다.');
        return;
      }
      if (data.approvers.length === 0) {
        alert('결재자가 선택되지 않았습니다');
        return;
      }

      const docData = {
        id,
        ccDept: data.ccDept.map(dept => dept.deptCd),
        ccUser: data.ccUser.map(emp => emp.empNo),
        title: data.title,
        executeDate: data.executeDate,
        docType: data.documentType,
        line: newApprovers,
        contents: data.content,
        state: requestType,
      };

      try {
        const response = await updateDocument(docData);

        if (response.status === 204) {
          if (fileData.length > 0) {
            // 파일 데이터가 있는 경우에만 실행
            await fetchFileHandler(id);
          }
          if (requestType === 'PROCEEDING') {
            alert('결재요청에 성공했습니다.');
            setIsDetail(true);
            navigate('/approval/document');
            dispatch(uiActions.selectMenu('/approval/document'));
          } else {
            alert('임시저장에 성공했습니다');
            navigate('/approval/temporary');
            dispatch(uiActions.selectMenu('/approval/temporary'));
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(selectedActions.resetArray());
        dispatch(selectedActions.resetResination());
        dispatch(userActions.resetArray());
      }
    }
  };

  /**
   * 사직원 임시저장
   * @param requestType
   * @returns
   */

  const updateResignationHandler = async (requestType: 'PROCEEDING' | 'TEMP' | 'APPROVED') => {
    const confirmMsg = `${
      requestType === 'PROCEEDING' ? '결재요청 작성하시겠습니까?' : '임시 저장하시겠습니까?'
    }`;

    if (window.confirm(confirmMsg)) {
      if (data.approvers.length === 0) {
        alert('결재자가 선택되지 않았습니다');
        return;
      }

      if (userData.userSSN === null) {
        alert('주민번호가 입력되지 않았습니다.');
        return;
      }

      if (data.retireDate === '') {
        alert('퇴사일자를 입력하지 않았습니다.');
        return;
      }
      if (userData.address === '') {
        alert('주소가 입력되지 않았습니다');
        console.log(data.reasonRetire.trim().length);
        return;
      }

      if (userData.mobilePhone === '') {
        alert('휴대폰 연락처가 입력되지 않았습니다.');
        return;
      }

      if (data.reasonCd === '') {
        alert('퇴직 사유를 선택해 주세요.');
        return;
      }

      if (data.reasonRetire) {
        if (data.reasonRetire === '') {
          alert('퇴직 사유를 입력해 주십시오.');
          return;
        }
        if (data.reasonRetire.trim().length < 10) {
          alert('퇴직 사유를 10자 이상 입력해 주십시오.');
          return;
        }
      }

      const newApprovers = approvers.map(employee => ({
        apprType: employee.approvalType,
        approver: employee.empNo,
        deferredYn: employee.deferredYn,
        overrideYn: employee.overrideYn,
        order: employee.order as number,
      }));

      const docData = {
        id,
        address: userData.address,
        homeContact: userData.homePhone,
        identityNo: userData.userSSN,
        mobileContact: userData.mobilePhone,
        reasons: data.reasonRetire,
        reasonCd: data.reasonCd,
        resignationDate: data.retireDate,
        line: newApprovers,
        state: requestType, // 이 부분을 requestType에 따라 설정
      };
      try {
        const response = await updateResignation(docData);

        if (response.status === 204) {
          if (fileData.length > 0) {
            // 파일 데이터가 있는 경우에만 실행
            await fetchFileHandler(id);
          }
          alert(`${requestType === 'PROCEEDING' ? '결재 요청' : '임시 저장'}에 성공했습니다.`);
          setIsDetail(true);
          navigate('/approval/document');
          dispatch(uiActions.selectMenu('/approval/document'));
          dispatch(selectedActions.resetArray());
          dispatch(selectedActions.resetResination());
          dispatch(userActions.resetArray());
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 문서 삭제
  const deleteDocumentHandler = async (id: string) => {
    const confirmMsg = '문서를 삭제하시겠습니까?';

    if (window.confirm(confirmMsg)) {
      try {
        const response = await deleteDocument(id);
        console.log(response);
        if (response.status === 204) {
          navigate('/approval/temporary');
          alert('삭제가 완료되었습니다.');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return {
    id,
    isModalOpen,
    isRefModalOpen,
    handleShowModal,
    handleCloseModal,
    handleShowRefModal,
    handleCloseRefModal,
    goBackPage,
    goCreateExecution,
    requestApprovalHandler,
    updateDocumentHandler,
    updateResignationHandler,
    deleteDocumentHandler,
    changeTempModeHandler,
    requestApprovalType,
    requestTempDocument,
    recallDocument,
  };
};

export default useApprovalRequest;
