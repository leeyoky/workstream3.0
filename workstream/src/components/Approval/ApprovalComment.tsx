import React, { ChangeEvent, useState, useEffect, ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { deleteComment, fetchComment, getApprovalData, updateComment } from '../../api/axios';
import { formatDateOnly } from '../../helpers/formatDateTime';
import classes from '../../pages/Approval/Approval.module.css';
import { ApprovalData, CommentItem } from '../../types/Approval/Approaval';
import Alert from '../../Layout/Alert';
interface AlertProps {
  title?: ReactNode;
  content?: ReactNode;
  message: string | null;
  onClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  type: 'confirm' | 'alert'; // 추가: 확인/취소 버튼이 있는지 여부
  response?: boolean; // 추가: API 응답 여부
}

const ApprovalComment = () => {
  const { id = '' } = useParams<string>();
  const [comment, setComment] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [listData, setListData] = useState<ApprovalData | null>(null);
  const [editCommentIndex, setEditCommentIndex] = useState<number | null>(null);
  const [commentStates, setCommentStates] = useState<string[]>([]); // 수정된 부분: 빈 배열로 초기화
  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const response = await getApprovalData(id);
        const data = response.data;
        setDataChanged(false);
        setListData(data);
        console.log('data', data);
        
        // 수정된 부분: 리스트 데이터가 변경되면 각 아이템에 대한 상태 초기화
        setCommentStates(data?.comment.map((item: CommentItem) => item.comment) || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(id);
  }, [dataChanged, id]);

  const commentChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const inputComment = e.target.value;
    const newCommentStates = [...commentStates];
    newCommentStates[index] = inputComment;
    setCommentStates(newCommentStates);
  };

  const commentSubmitHandler = async () => {
    const confirmMsg = '의견을 등록하시겠습니까?';

    if (window.confirm(confirmMsg)) {
      const commentData = {
        apprId: id,
        comment: comment,
      };
      try {
        const response = await fetchComment(commentData);
        if (response.status === 201) {
          setDataChanged(true);
          setComment('');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateCommentHandler = (commentId: number) => {
    setEditCommentIndex(commentId);
  };

  const confirmUpdateHandler = async (index: number, commentId: number) => {
    const confirmMsg = '정말로 수정하시겠습니까?';
    if (window.confirm(confirmMsg)) {
      const commentData = {
        id: commentId,
        comment: commentStates[index] || '',
      };
      console.log('commentData', commentData);
      
      try {
        const response = await updateComment(commentData);
        if (response.status === 204) {
          setDataChanged(true);
          setEditCommentIndex(null);
          setAlertMessage('수정이 완료되었습니다.')
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setEditCommentIndex(null);
    }
  };

  const cancelUpdateHandler = (commentId: number) => {
    const newCommentStates = [...commentStates];
    newCommentStates[commentId] = listData?.comment[commentId]?.comment || '';
    setCommentStates(newCommentStates);
    setEditCommentIndex(null);
  };

  const deleteCommentHandler = async (commentId: number) => {
    const confirmMsg = '삭제하시겠습니까?';
    if (window.confirm(confirmMsg)) {
      try {
        const response = await deleteComment(commentId);
        if (response.status === 204) {
          setDataChanged(true);
          alert('삭제되었습니다.');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const closeAlertHandler = () => {
    setAlertMessage(null);
  }

  return (
    <div className={classes['comment-wrapper']}>
      <h2>
        의견
        <i className="fa-regular fa-comment"></i>
      </h2>
      <hr />
      <div className={classes['comment-container']}>
        <div className={classes['comment-input-wrapper']}>
          <textarea
            spellCheck={false}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button
          className="btn btn-secondary"
          onClick={commentSubmitHandler}
        >
          의견등록
        </button>
      </div>
      {/* 반복할 item */}
      {listData?.comment.map((item, index) => (
        <div className={classes['comment-list-item-container']} key={item.id}>
          <div className={classes['comment-info-wrapper']}>
            <div className={classes['comment-profile-usename']}>
              <span>
                {item.regUsrNm} {item.rankNm}
              </span>
              <span>
                ( {item.deptNm} )
              </span>
            </div>
          </div>
          <div className={classes['comment-content']}>
          {editCommentIndex === index ? (
              <div className={classes['comment-edit']}>
                <textarea
                  spellCheck={false}
                  value={commentStates[index]}
                  onChange={(e) => commentChangeHandler(e, index)}
                />
              </div>
            ) : (
              <p>
                <span className={classes['comment-item']}>
                {item.comment.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <br />}
                    {line}
                  </React.Fragment>
                ))}
                </span>
                <span className={classes['comment-date']}>
                {item.regDate !== item.modDate ? (
                  <span>
                    (수정됨) {formatDateOnly(item.modDate)}</span>
                  ) : (
                    <span>{formatDateOnly(item.regDate)}</span>
                    )}
                  </span>
              </p>
            )}
          </div>
          <div className={classes['comment-button-box']}>
            {editCommentIndex !== index ? (
              <>
                <i
                  className='fa-solid fa-pen-to-square'
                  onClick={() => updateCommentHandler(index)}
                ></i>
                <i
                  className="fa-regular fa-trash-can"
                  onClick={() => deleteCommentHandler(item.id)}
                ></i>
              </>
            ) : (
              <>
                <i
                  className={`${classes['checkIcon']} fa-solid fa-check`}
                  onClick={() => confirmUpdateHandler(index, item.id)}
                ></i>
                <i
                  className={`${classes['xmarkIcon']} fa-solid fa-xmark`}
                  onClick={() => cancelUpdateHandler(index)}
                ></i>
              </>
            )}
          </div>
        </div>
      ))}
      {alertMessage && (
        <Alert 
          message={alertMessage}
          onClose={closeAlertHandler}
          type="alert"
          response={true}
          />
          )}
    </div>
  );
};

export default ApprovalComment;
