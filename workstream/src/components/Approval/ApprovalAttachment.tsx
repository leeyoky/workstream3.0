// ApprovalAttachment.js
import React, { useEffect, useState } from 'react';
import classes from '../../pages/Approval/Approval.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fileActions } from './../../store/file-slice';
import { useApprovalData } from '../../hooks/Approval/useApprovalData';
import { useParams } from 'react-router-dom';
import { deleteFileData } from '../../api/axios';
import { ApprovalData } from '../../types/Approval/Approaval';

const ApprovalAttachment = () => {

  const [ selectedFiles, setSelectedFiles ] = useState<File[]>([]); // 새로 추가하는 로컬 파일
  const [ isFileSelected, setIsFileSelected ] = useState(false);
  const [ showAlert, setShowAlert ] = useState(false);
  const isEditMode = useSelector((state:RootState) => state.approval.isEditMode);
  const isDetailMode = useSelector((state:RootState) => state.approval.isDetailMode);
  const { id = '' } = useParams();
  const { data } = useApprovalData(id);
  const [ isServerFile, setIsServerFile ] = useState< ApprovalData |undefined>();
  const [ drag, setDrag] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=> {
    setIsServerFile(data);
  }, [data])

  const dragEnterHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true);
  }

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  }

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);

    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  }

  useEffect(() => {
    setIsFileSelected(selectedFiles.length > 0);
    dispatch(fileActions.updateSelectedFiles(selectedFiles)); // 파일을 추가하기 전에 dispatch

    }, [selectedFiles, dispatch, isEditMode]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files); // 선택한 파일 목록을 배열로 변환
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    }
  };

  const fileDeleteHandler = (file: File) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((prevFile) => prevFile !== file));
  };

  const fileDeleteAPIHandler = async (fileId: number) => {
    const confirmMsg = window.confirm('첨부파일을 삭제하시겠습니까?');
    if(confirmMsg){
      try {
        await deleteFileData(fileId);
  
        setIsServerFile((prevData) => {
          if (!prevData) return prevData;
        
          const updatedFiles = prevData.files.filter(item => item.id !== fileId);
        
          // 정확한 반환 형식을 지정
          return { 
            ...prevData, 
            files: updatedFiles 
          } as ApprovalData; 
        });
  
        alert('삭제되었습니다.');
      } catch (error) {
        console.error(error);
      }
    }
  }

  const fileDownloadHandler = (fileId: number, fileName: string) => {
    try {
      // 파일 다운로드 URL을 동적으로 생성
      const downloadUrl = `${import.meta.env.VITE_REACT_APP_API_BASE_URL}approval/file/${fileId}`;
  
      // 파일 다운로드
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      // 다운로드 오류 처리
      console.error('다운로드 실패:', error);
      // 사용자에게 피드백 제공 등, 예를 들면 사용자에게 오류 메시지를 표시
    }
  };

  return (
    <div className={classes["approval-create-wrapper"]}>
      {/* 문서 새작성 및 임시저장 상태 */}
      {isEditMode ? (
      <div
        className={classes["approval-attachment"]}
        onDragEnter={dragEnterHandler}
        onDragLeave={dragLeaveHandler}
        onDragOver={(e) => e.preventDefault()}
        onDrop={dropHandler}
      >
      <h2>
        <i className="fa-solid fa-paperclip"></i>
        첨부파일
      </h2>
        <div className={`${classes["approval-attachment-item"]} ${drag ? classes.active : ''}`}>
          <div className={classes["file-edit"]}>
            <div className={`${classes["file-list"]} ${isFileSelected || drag ? classes.active : ''}`}>
              <ul>
                {/* 임시저장일때 */}
                {isServerFile?.files && isServerFile?.files.length > 0 && isDetailMode ? (
                  <>
                    {isServerFile.files.map((item, index) => (
                      <li key={index}>
                        <span>{item.fileName}</span>
                        <button onClick={() => fileDeleteAPIHandler(item.id)}>
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </li>
                    ))}
                    {selectedFiles.map((file, index) => (
                      <li key={index}>
                        {file.name}
                        <button onClick={() => fileDeleteHandler(file)}>
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </li>
                    ))}
                  </>
                ) : (
                  selectedFiles.map((file, index) => (
                    <li key={index}>
                      {file.name}
                      <button onClick={() => fileDeleteHandler(file)}>
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
              <div className={classes['file-info']}>
                <p>
                  첨부할 파일을 드래그하거나 
                  <i className="fa-solid fa-paperclip"></i>
                </p>
                <label htmlFor="approval-attach-file"> 파일선택 </label>
                <input
                  className={classes["approval-attach-file"]}
                  id='approval-attach-file'
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                />
              </div>
          </div>
        </div>
      </div>

      ) : (

        /* Detail일때 */
      <div className={classes["approval-attachment"]}>
        <h2>
          <i className="fa-solid fa-paperclip"></i>
          첨부파일
        </h2>
        <div className={classes["approval-attachment-item-download"]}>
          <div className={classes["file-download"]}>
            <ul>
              {data?.files && data?.files.length > 0 ? (
                data.files.map((item, index) => (
                  <li key={index} onClick={() => fileDownloadHandler(item.id, item.fileName)}>
                    <span>
                      {item.fileName}
                    </span>
                    <button>
                      <i className="fa-solid fa-angle-down"></i>
                    </button>
                  </li>
                ))
              ) : (
                <span>첨부된 파일이 없습니다</span>
              )}
            </ul>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default ApprovalAttachment;
