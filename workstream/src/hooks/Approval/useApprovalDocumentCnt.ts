import { useState, useEffect, useCallback } from 'react'
import { DocumentCounts } from '../../types/Approval/Approaval';
import { countDoucumentType } from '../../api/axios';
import { useDispatch } from 'react-redux';
import { selectedActions } from '../../store/Approval/approval-slice';

const useApprovalDocumentCnt = () => {
  const [documentCnt, setDocumentCnt] = useState<DocumentCounts | undefined>();
  const dispatch = useDispatch();

  const fetchDocumentCount = useCallback (async() => {
    try {
      const response = await countDoucumentType();
      const data = response.data;
      console.log(data);
      setDocumentCnt(data);
      dispatch(selectedActions.setDocumentCnt(data));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch])

  useEffect(()=> {
    fetchDocumentCount();
  }, [dispatch, location.pathname])

  return{
    documentCnt, setDocumentCnt
  }

}

export default useApprovalDocumentCnt