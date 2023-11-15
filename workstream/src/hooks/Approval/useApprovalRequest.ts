import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectedActions } from '../../store/Approval/approval-slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { deleteDocument, fetchApprovalData, fetchFileData, fetchRecallDocument, updateDocument } from '../../api/axios';
import { AxiosError } from 'axios';

const useApprovalRequest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ documentData, setDocumentData] = useState();
  const [isDetail, setIsDetail] = useState(true);
  const { id = '' } = useParams<string>();
  const data = useSelector((state: RootState) => state.approval);
  const approvers = useSelector((state: RootState) => state.approval.approvers);
  const fileData = useSelector((state: RootState) => state.file.files);
  const agreementType = useSelector((state: RootState) => state.approval.agreementType)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=> {
    setIsDetail(false);
    
  },[isDetail])

  useEffect(()=> {
    console.log('approvers!', approvers);

  },[approvers]);


  

  const handleShowModal = () => { setIsModalOpen(true); }
  const handleCloseModal = () => { setIsModalOpen(false); }

  const goBackPage = () => {
    const isCancle = window.confirm('작업한 모든 문서의 정보를 잃게됩니다. 취소하시겠습니까?');
    if (isCancle) {
      navigate('/approval/document');
      dispatch(selectedActions.resetArray());
    }
  }
  // 회수하기 
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
  

  // 첨부파일 업데이트
  const fetchFileHandler = async( documentId : string ) => {

    const formData = new FormData();

    // fileData 정보를 formData에 추가
    fileData.forEach((file) => {
      formData.append('files', file);
    })

    formData.append('docNumber' , documentId);
    formData.append('docType', 'APPROVAL');
    console.log('첨부파일 api formData');
    
    try {
      const response = await fetchFileData(formData);
      const data = response.data;
      console.log(data);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  // 임시저장
  const updateDocumentHandler = async() => {
    const confirmMsg = '임시저장 하시겠습니까?'
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
        state: 'TEMP', 
      };

      console.log('임시저장 formData', docData);

      try {
        const response = await updateDocument(docData);
        console.log(response);
        alert('임시저장 하였습니다')
        navigate(`/approval/temporary`);
        dispatch(selectedActions.resetArray());
      } catch (error) {
        console.log(error);
      }
    }
  }

  // 문서 삭제

  const deleteDocumentHandler = async(id: string) => {
    const confirmMsg = '문서를 삭제하시겠습니까?'
    console.log("현재 문서의 ID : " , id);

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


  return {
    id,
    isDetail,
    isModalOpen,
    handleShowModal,
    handleCloseModal,
    goBackPage,
    requestApprovalHandler,
    updateDocumentHandler,
    deleteDocumentHandler,
    recallDocument
  } 
};

export default useApprovalRequest;
