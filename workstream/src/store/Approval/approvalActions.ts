import { useDispatch } from "react-redux"
import { fetchApprovalData } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { selectedActions } from "./approval-slice";

const approvalActions = () => {
  const navigate = useNavigate();

  /* POST APPROVAL */
  const fetchApproval = async (approvalData:string) => {
    try {
      const approvalData = {
        /* 참조부서 */
        ccDept: '', 
        /* 참조유저 */
        ccUser: '', 
        /* 내용 */
        contents: '', 
        /* 문서종류 */
        docType: '',  
        /* 결재/합의라인 */
        line: [
          {
            apprType: '',
            approver: '',
            order: ''
          },
        ],
        state: '',
        title: '',
      }
      const response = await fetchApprovalData(approvalData);
      
      if(response.status === 201){
        alert('결재요청 완료');
        navigate('/approval');
      }else{
        throw new Error('ERROR!')
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
}

export default approvalActions