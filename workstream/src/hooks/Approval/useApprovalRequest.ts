import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectedActions } from '../../store/Approval/approval-slice';
import { RootState } from '../../store';
import { deleteDocument, fetchApprovalData, fetchApproveDocument, fetchFileData, fetchRecallDocument, fetchResinationData, updateDocument, updateResignation } from '../../api/axios';
import { AxiosError } from 'axios';

const useApprovalRequest = () => {
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ isRefModalOpen, setIsRefModalOpen ] = useState(false);
  const [ documentData, setDocumentData] = useState<any>(null);
  const [ approvedYn, setApprovedYn ] = useState('');
  const [isDetail, setIsDetail] = useState(true);
  const { id = '' } = useParams<string>();

  const data = useSelector((state: RootState) => state.approval);
  const userData = useSelector((state: RootState) => state.user);
  const approvers = useSelector((state: RootState) => state.approval.approvers);
  const fileData = useSelector((state: RootState) => state.file.files);
  const agreementType = useSelector((state: RootState) => state.approval.agreementType);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowModal = () => {
    setIsModalOpen(true);
    dispatch(selectedActions.setReference(false));
  }
  const handleCloseModal = () => setIsModalOpen(false);

  const handleShowRefModal = () => {
    setIsRefModalOpen(true);
    dispatch(selectedActions.setReference(true));
  }
  const handleCloseRefModal = () => setIsRefModalOpen(false);

  useEffect(()=> { 
    setIsDetail(false);
  },[isDetail]);

  // 문서함 이동
  const goBackPage = () => {
    const isCancle = window.confirm('작업한 모든 문서의 정보를 잃게됩니다. 취소하시겠습니까?');
    if (isCancle) {
      navigate('/approval/document');
      dispatch(selectedActions.resetArray());
    }
  }

  // 문서 회수하기 
  const recallDocument = async(id: string) => {
    const confirmMsg = window.confirm('문서를 회수하시겠습니까?');
      if(confirmMsg){
        try {
          const response = await fetchRecallDocument(id);
          if(response.status === 204){
          navigate(`/approval/detail/${id}`)
        }
      } catch (error: any) {
        if((error as AxiosError).response?.status === 400){
          alert("진행 중인 결재문서는 회수 불가합니다.")
        }
        console.log(error);
      }
    }
  }

  // 결재요청(문서종류)
  const requestApprovalType = ( documentType: string , requestType: 'PROCEEDING' | 'TEMP' ) => {
    if(documentType === 'APPROVAL_COMMON'){
      requestApprovalHandler(requestType);
    }else if(documentType === 'RESIGNATION'){
      requestResinationHandler(requestType);
    }
  }

  // 결재 요청
  const requestApprovalHandler = async (requestType: 'PROCEEDING' | 'TEMP') => {
    if (data.executeDate === '') {
      alert('시행일자를 입력하지 않았습니다.');
      return;
    }
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
    const confirmMsg = `${requestType === 'PROCEEDING' ? '결재 요청하시겠습니까?' : '임시 저장하시겠습니까?'}`;
  
    if (window.confirm(confirmMsg)) {
      let order = 0;
      let prevApprovalType = '';
  
      /* 합의 방식이 병렬인 경우 같은 order 부여 */
      const newApprovers = approvers.map((employee) => {
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
        console.log(response);
        setDocumentData(responseData);
  
        if (response.status === 201) {
          await fetchFileHandler(responseData.id);
          alert('결재요청에 성공했습니다.');
          setIsDetail(true);
          navigate(`/approval/detail/${responseData.id}`);
          dispatch(selectedActions.resetArray());
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 사직원 결재요청
  const requestResinationHandler = async( requestType: 'PROCEEDING' | 'TEMP' ) => {
    // 임시저장, 결재요청의 여부
    const confirmMsg = `${requestType === 'PROCEEDING' ? '결재 요청하시겠습니까?' : '임시 저장하시겠습니까?'}`;
    
    if(data.finalSign === false){
      alert('서명을 하지 않았습니다.');
      return;
    }

    if(window.confirm(confirmMsg)) {
      let order = 0;
      let prevApprovalType = '';
  
      /* 합의 방식이 병렬인 경우 같은 order 부여 */
      const newApprovers = approvers.map((employee) => {
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
          address: userData.address,
          homeContact: userData.homePhone,
          identityNo: userData.userSSN,
          mobileContact: userData.mobilePhone,
          reasons: data.reasonRetire,
          resignationDate: data.retireDate,
          line: newApprovers,
          state: requestType, // 이 부분을 requestType에 따라 설정
        };

        const response = await fetchResinationData(docData);
        const responseData = response.data;
        console.log('responseData', responseData);
  
        if (response.status === 201) {
          await fetchFileHandler(responseData.id);
          alert("결재 성공")
          setIsDetail(true);
          navigate(`/approval/detail/${responseData.id}`);
          dispatch(selectedActions.resetArray());
        }

      } catch (error) {
        console.log(error);
      }
    }
  }
  

  // 첨부파일 업데이트
  const fetchFileHandler = async( documentId : string ) => {

    const formData = new FormData();

    // fileData 정보를 formData에 추가
    fileData.forEach((file) => {
      formData.append('files', file);
    })

    formData.append('docNumber' , documentId);
    formData.append('docType', 'APPROVAL');
    
    try {
      const response = await fetchFileData(formData);
      const data = response.data;
      console.log('fileData',data);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const requestTempDocument = (documentType: string , requestType: 'PROCEEDING' | 'TEMP' ) => {
    if(documentType === 'APPROVAL_COMMON'){
      updateDocumentHandler(requestType);
    }else if(documentType === 'RESIGNATION'){
      updateResignationHandler(requestType);
    }
  }

  // 임시저장 -> 임시저장 / 결재요청
  const updateDocumentHandler = async(requestType: 'PROCEEDING' | 'TEMP') => {
    
    const confirmMsg = 
      `${requestType === 'PROCEEDING' ? '결재 요청하시겠습니까?' : '임시 저장하시겠습니까?'}`;
    
    if(window.confirm(confirmMsg)){
      const newApprovers = approvers.map((employee, index) => ({
        apprType: employee.approvalType,
        approver: employee.empNo,
        order: index + 1,
      }));
      
      const docData = {
        id,
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
          await fetchFileHandler(id);
          alert(`${requestType === 'PROCEEDING' ? '결재 요청' : '임시 저장'}에 성공했습니다.`);
          setIsDetail(true);
          navigate(`/approval/temporary`);
          dispatch(selectedActions.resetArray());
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const updateResignationHandler = async(requestType: 'PROCEEDING' | 'TEMP') => {
    
    const confirmMsg = 
      `${requestType === 'PROCEEDING' ? '결재 요청하시겠습니까?' : '임시 저장하시겠습니까?'}`;
    
    if(window.confirm(confirmMsg)){
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
          await fetchFileHandler(id);
          alert(`${requestType === 'PROCEEDING' ? '결재 요청' : '임시 저장'}에 성공했습니다.`);
          setIsDetail(true);
          navigate(`/approval/temporary`);
          dispatch(selectedActions.resetArray());
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  // 문서 삭제
  const deleteDocumentHandler = async(id: string) => {
    const confirmMsg = '문서를 삭제하시겠습니까?'

    if(window.confirm(confirmMsg)){
      try {
        const response = await deleteDocument(id);
        console.log(response);
        if(response.status === 204){
          navigate(`/approval/temporary`);
          alert('삭제가 완료되었습니다.')
        }
      } catch (error) {
        console.log(error);
        
      }
    }
  }

  /* 결재 승인/반려 */
  const approveDocumentHandler = async( approverId: number, result: 'Y' | 'R') => {
    const confirmMsg = `${result === 'Y' ? '승인하시겠습니까?' : '반려하시겠습니까?'}`;
    if(window.confirm(confirmMsg)){
      try {
        const approveData = {
          id: approverId,
          approvedYn: result
        }
        const response = await fetchApproveDocument(approveData);
        console.log(response);
        console.log('approveData', approveData);
        if(response.status === 403) {
          alert ('권한이 없습니다.')
        }
        if(response.status === 204) {
          setApprovedYn(result)
          alert(`${result === 'Y' ? '결재를 승인하였습니다.' : '결재를 반려하였습니다.'}`);
        }
        
      } catch (error) {
        console.error(error);
        
      }
    }
  }


  return {
    id,
    isModalOpen,
    isRefModalOpen,
    approvedYn,
    setApprovedYn,
    handleShowModal,
    handleCloseModal,
    handleShowRefModal,
    handleCloseRefModal,
    goBackPage,
    requestApprovalHandler,
    updateDocumentHandler,
    updateResignationHandler,
    deleteDocumentHandler,
    approveDocumentHandler,
    requestApprovalType,
    requestTempDocument,
    recallDocument
  } 
};

export default useApprovalRequest;
