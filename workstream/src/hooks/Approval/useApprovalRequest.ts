import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { selectedActions } from './../../store/Approval/approval-slice';
import {
  deleteDocument,
  fetchApprovalData,
  fetchApproveDocument,
  fetchComment,
  fetchFileData,
  fetchRecallDocument,
  fetchResignationData,
  updateApproveDocument,
  updateDocument,
  updateResignation,
} from '../../api/axios';
import { AxiosError } from 'axios';
import { userActions } from '../../store/User/user-slice';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { uiActions } from '../../store/ui-slice';

const useApprovalRequest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefModalOpen, setIsRefModalOpen] = useState(false);
  const [isInstModalOpen, setIsInstModalOpen] = useState(false);
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const [approvedYn, setApprovedYn] = useState('');
  const [isDetail, setIsDetail] = useState(true);
  const { id = '' } = useParams<string>();

  const data = useSelector((state: RootState) => state.approval);
  const userData = useSelector((state: RootState) => state.user);
  const approvers = useSelector((state: RootState) => state.approval.approvers);
  const fileData = useSelector((state: RootState) => state.file.files);
  const agreementType = useSelector((state: RootState) => state.approval.agreementType);
  const instructionComment = useSelector((state: RootState) => state.approval.comment);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {}, [navigate]);

  const handleShowModal = () => {
    setIsModalOpen(true);
    dispatch(selectedActions.setReference(false));
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const handleShowRefModal = () => {
    setIsRefModalOpen(true);
    dispatch(selectedActions.setReference(true));
  };
  const handleCloseRefModal = () => setIsRefModalOpen(false);

  const handleShowInstModal = () => {
    setIsInstModalOpen(true);
  };
  const handleCloseInstModal = () => {
    setIsInstModalOpen(false);
  };

  const handleShowPdfModal = () => {
    setIsPDFModalOpen(true);
  };
  const handleClosePdfModal = () => {
    setIsPDFModalOpen(false);
  };
  useEffect(() => {
    setIsDetail(false);
  }, [isDetail]);

  // 문서함 이동
  const goBackPage = () => {
    const isCancle = window.confirm('작업한 모든 문서의 정보를 잃게됩니다. 취소하시겠습니까?');
    if (isCancle) {
      navigate('/approval/document');
      dispatch(selectedActions.resetArray());
    }
  };

  // 문서 회수하기
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
   * @description 완료, 반려 문서를 재기안 하는 기능
   * isEdit = true, isDetail = false
   */
  const changeTempModeHandler = (reqestType: 'Y' | 'N') => {
    if (reqestType === 'Y') {
      dispatch(selectedActions.setIsReviseMode(true));
    } else {
      dispatch(selectedActions.setIsReviseMode(false));
    }
  };

  /**
   *
   * @param documentType
   * @param requestType
   */

  // 결재요청(문서종류)
  const requestApprovalType = (documentType: string, requestType: 'PROCEEDING' | 'TEMP') => {
    if (documentType === 'APPROVAL_COMMON') {
      requestApprovalHandler(requestType);
    } else if (documentType === 'RESIGNATION') {
      requestResinationHandler(requestType);
    }
  };

  // 결재 요청
  const requestApprovalHandler = async (requestType: 'PROCEEDING' | 'TEMP') => {
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
      let order = 0;
      let prevApprovalType = '';

      /* 합의 방식이 병렬인 경우 같은 order 부여 */
      const newApprovers = approvers.map(employee => {
        if (agreementType === 'parallel' && employee.approvalType === 'CONSENSUAL') {
          if (prevApprovalType !== 'CONSENSUAL') {
            order += 1;
          }
          prevApprovalType = 'CONSENSUAL';
        } else {
          order += 1;
          prevApprovalType = '';
        }

        // order를 부여
        return {
          apprType: employee.approvalType,
          approver: employee.empNo,
          order: order,
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

        const response = await fetchApprovalData(formData);
        const responseData = response.data;

        if (response.status === 201) {
          if (fileData.length > 0) {
            // 파일 데이터가 있는 경우에만 실행
            await fetchFileHandler(responseData.id);
          }
          alert('결재요청에 성공했습니다.');
          navigate(`/approval/detail/${responseData.id}`);
          setIsDetail(true);
          dispatch(selectedActions.resetArray());
          dispatch(userActions.resetArray());
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // 사직원 결재요청
  const requestResinationHandler = async (requestType: 'PROCEEDING' | 'TEMP') => {
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
      return;
    }

    if (userData.mobilePhone === '') {
      alert('휴대폰 연락처가 입력되지 않았습니다.');
      return;
    }

    if (data.reasonRetire === '') {
      alert('퇴직 사유를 입력해 주십시오.');
      return;
    }

    if (data.finalSign === false) {
      alert('서명을 하지 않았습니다.');
      return;
    }

    if (window.confirm(confirmMsg)) {
      let order = 0;
      let prevApprovalType = '';

      /* 합의 방식이 병렬인 경우 같은 order 부여 */
      const newApprovers = approvers.map(employee => {
        if (agreementType === 'parallel' && employee.approvalType === 'CONSENSUAL') {
          if (prevApprovalType !== 'CONSENSUAL') {
            order += 1;
          }
          prevApprovalType = 'CONSENSUAL';
        } else {
          order += 1;
          prevApprovalType = '';
        }

        // order를 부여
        return {
          apprType: employee.approvalType,
          approver: employee.empNo,
          order: order,
        };
      });

      try {
        const docData = {
          ccDept: data.ccDept.map(dept => dept.deptCd),
          ccUser: data.ccUser.map(emp => emp.empNo),
          address: userData.address,
          homeContact: userData.homePhone,
          identityNo: userData.userSSN,
          mobileContact: userData.mobilePhone,
          reasons: data.reasonRetire,
          resignationDate: data.retireDate,
          line: newApprovers,
          state: requestType, // 이 부분을 requestType에 따라 설정
        };

        const response = await fetchResignationData(docData);
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
        }
      } catch (error) {
        console.log(error);
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

  const requestTempDocument = (documentType: string, requestType: 'PROCEEDING' | 'TEMP') => {
    if (documentType === 'APPROVAL_COMMON') {
      updateDocumentHandler(requestType);
    } else if (documentType === 'RESIGNATION') {
      updateResignationHandler(requestType);
    }
  };

  // 임시저장 -> 임시저장 / 결재요청
  const updateDocumentHandler = async (requestType: 'PROCEEDING' | 'TEMP') => {
    const confirmMsg = `${
      requestType === 'PROCEEDING' ? '결재 요청하시겠습니까?' : '임시 저장하시겠습니까?'
    }`;

    if (window.confirm(confirmMsg)) {
      const newApprovers = approvers.map((employee, index) => ({
        apprType: employee.approvalType,
        approver: employee.empNo,
        order: index + 1,
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
      }
    }
  };

  const updateResignationHandler = async (requestType: 'PROCEEDING' | 'TEMP') => {
    const confirmMsg = `${
      requestType === 'PROCEEDING' ? '결재 요청하시겠습니까?' : '임시 저장하시겠습니까?'
    }`;

    if (window.confirm(confirmMsg)) {
      const newApprovers = approvers.map((employee, index) => ({
        apprType: employee.approvalType,
        approver: employee.empNo,
        order: index + 1,
      }));

      const docData = {
        id,
        address: userData.address,
        homeContact: userData.homePhone,
        identityNo: userData.userSSN,
        mobileContact: userData.mobilePhone,
        reasons: data.reasonRetire,
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
          dispatch(userActions.resetArray());
          dispatch(selectedActions.resetResination());
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

  /* 결재 승인/반려 */
  const approveDocumentHandler = async (approverId: number, result: 'Y' | 'R') => {
    const confirmMsg = `${result === 'Y' ? '승인하시겠습니까?' : '반려하시겠습니까?'}`;
    if (window.confirm(confirmMsg)) {
      try {
        const approveData = {
          id: approverId,
          approvedYn: result,
        };
        const response = await fetchApproveDocument(approveData);
        console.log(response);
        if (response.status === 403) {
          alert('권한이 없습니다.');
        }
        if (response.status === 204) {
          setApprovedYn(result);
          alert(`${result === 'Y' ? '결재를 승인하였습니다.' : '결재를 반려하였습니다.'}`);
          navigate('/approval/pending');
          dispatch(uiActions.selectMenu('/approval/pending'));
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  /* 최종결재 */
  const instructionHandler = async (approverId: number, result: 'Y' | 'R') => {
    const confirmMsg = `${result === 'Y' ? '승인하시겠습니까?' : '반려하시겠습니까?'}`;

    /* 승인 할때 */
    if (window.confirm(confirmMsg)) {
      const commentData = {
        apprId: id,
        comment: instructionComment,
      };
      const approveData = {
        id: approverId,
        approvedYn: result,
      };
      try {
        const response = await fetchComment(commentData);
        if (response.status === 201) {
          dispatch(selectedActions.setComment(''));
          /* 승인/ 반려 업데이트 */
          const response = await fetchApproveDocument(approveData);
          console.log(response);
          if (response.status === 403) {
            alert('권한이 없습니다.');
          }
          if (response.status === 204) {
            setApprovedYn(result);
            alert(`${result === 'Y' ? '결재를 승인하였습니다.' : '결재를 반려하였습니다.'}`);
            navigate('/approval/pending');
            dispatch(uiActions.selectMenu('/approval/pending'));
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  /* 결재 승인/취소 */
  const updateApprovalHandler = async (id: number) => {
    const confirmMsg = '기존의 결재를 회수하시겠습니까?';
    if (window.confirm(confirmMsg)) {
      try {
        const response = await updateApproveDocument(id);
        console.log(response);
        if (response.status === 204) {
          alert('결재회수 하였습니다.');
          navigate('/approval/in-progress');
          dispatch(uiActions.selectMenu('/approval/in-progress'));
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  /**
   *  @description PDF 다운 기능
   *  @access 등록자만 가능
   */

  const pdfDownloadHandler = () => {
    const element: HTMLElement = document.getElementById('approval')!;

    html2canvas(element, { scale: 3 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        format: 'a4',
        orientation: 'portrait',
        unit: 'mm',
      });

      const padding = 10; // You can adjust the padding value as needed
      const pdfWidth = 210 - 2 * padding;
      const pdfHeight = 297 - 2 * padding;

      pdf.addImage(imgData, 'PNG', padding, padding, pdfWidth, pdfHeight);
      pdf.save('DS품의서.pdf');
    });
  };

  /**
   * @description PDF Viewer 기능
   * @aceess Read 권한이 있는 모두가 가능
   */

  return {
    id,
    isModalOpen,
    isRefModalOpen,
    isInstModalOpen,
    isPDFModalOpen,
    approvedYn,
    setApprovedYn,
    handleShowModal,
    handleCloseModal,
    handleShowRefModal,
    handleCloseRefModal,
    handleShowInstModal,
    handleCloseInstModal,
    handleShowPdfModal,
    handleClosePdfModal,
    goBackPage,
    requestApprovalHandler,
    updateDocumentHandler,
    updateResignationHandler,
    deleteDocumentHandler,
    approveDocumentHandler,
    updateApprovalHandler,
    changeTempModeHandler,
    requestApprovalType,
    requestTempDocument,
    recallDocument,
    pdfDownloadHandler,
    instructionHandler,
  };
};

export default useApprovalRequest;
