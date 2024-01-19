import React, { useEffect, useState } from 'react';
import classes from '../../../pages/Approval/Approval.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { fileActions } from '../../../store/file-slice';
import { useParams } from 'react-router-dom';
import { deleteFileData, getFileData } from '../../../api/axios';
import { ApprovalData, CommonData } from '../../../types/Approval/Approaval';
import PdfViewerModal from '../../../common/PdfViewerModal';
import useApprovalExecutionData from '../../../hooks/Approval/useApprovalExecutionData';

const ApprovalAttachment = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // 새로 추가하는 로컬 파일
  const [selectedFile, setSelectedFile] = useState<CommonData['files'][0] | null>(null);
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const isEditMode = useSelector((state: RootState) => state.approval.isEditMode);
  const isDetailMode = useSelector((state: RootState) => state.approval.isDetailMode);
  const isReviseMode = useSelector((state: RootState) => state.approval.isReviseMode);
  const documentType = useSelector((state: RootState) => state.approval.documentType);
  const loginUser = useSelector((state: RootState) => state.user.userInfo.empNo);
  const { id = '' } = useParams();
  const [isServerFile, setIsServerFile] = useState<CommonData | undefined>();
  const [drag, setDrag] = useState(false);
  const dispatch = useDispatch();
  const { data } = useApprovalExecutionData(id);
  const regUser = data?.execution.regUsr;

  const isSameUser = loginUser === regUser;

  useEffect(() => {
    console.log('documentType', documentType);

    console.log('id', id);
    console.log('data', data);
  }, [documentType, id]);

  useEffect(() => {
    setSelectedFiles([]);
  }, [isDetailMode]);

  useEffect(() => {
    setIsServerFile(data);
  }, [data, selectedFiles]);

  const dragEnterHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };

  // 드래그 앤 드롭 event
  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);

    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
  };

  // 파일 선택 event
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files); // 선택한 파일 목록을 배열로 변환
      setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    }
  };

  useEffect(() => {
    setIsFileSelected(selectedFiles.length > 0);
    dispatch(fileActions.updateSelectedFiles(selectedFiles)); // 파일을 추가하기 전에 dispatch
  }, [selectedFiles, isEditMode]);

  useEffect(() => {
    setSelectedFiles([]);
  }, [isEditMode]);

  /* 삭제 할때 로컬 useState랑 api랑 같이 삭제해야함 */

  const fileDeleteHandler = (file: File) => {
    const confirmMsg = window.confirm('첨부파일을 삭제하시겠습니까?');
    if (confirmMsg) {
      setSelectedFiles(prevFiles => prevFiles.filter(prevFile => prevFile !== file));
    } else {
      return;
    }
  };

  const fileDeleteAPIHandler = async (fileId: number) => {
    const confirmMsg = window.confirm('첨부파일을 삭제하시겠습니까?');
    if (confirmMsg) {
      try {
        await deleteFileData(fileId);

        setIsServerFile(prevData => {
          if (!prevData) return prevData;

          const updatedFiles = prevData.files.filter(item => item.id !== fileId);

          // 정확한 반환 형식을 지정
          return {
            ...prevData,
            files: updatedFiles,
          } as ApprovalData;
        });

        alert('삭제되었습니다.');
      } catch (error) {
        console.error(error);
      }
    }
  };

  /**
   * 첨부파일 다운로드 기능
   * @param fileId
   * @param fileName
   */
  const fileDownloadHandler = async (fileId: number, fileName: string) => {
    try {
      // 파일 데이터 받아오기
      const response = await getFileData(fileId);

      // 파일 다운로드
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // 객체 URL 해제
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // 다운로드 오류 처리
      console.error('다운로드 실패:', error);
      // 사용자에게 피드백 제공 등, 예를 들면 사용자에게 오류 메시지를 표시
    }
  };

  const openPdfViewer = (file: CommonData['files'][0]) => {
    // 작성자가 아니면 첨부파일 뷰어만 가능
    setSelectedFile(file);
    setIsPdfViewerOpen(true);
  };

  const closePdfViewer = () => {
    setSelectedFile(null);
    setIsPdfViewerOpen(false);
  };

  return (
    <div className={classes['approval-create-wrapper']}>
      {/* 문서 새작성 및 임시저장 상태 */}
      {isEditMode ? (
        <div
          className={classes['approval-attachment']}
          onDragEnter={dragEnterHandler}
          onDragLeave={dragLeaveHandler}
          onDragOver={e => e.preventDefault()}
          onDrop={dropHandler}>
          <h2>
            <i className="fa-solid fa-paperclip"></i>
            첨부파일
          </h2>
          <div className={`${classes['approval-attachment-item']} ${drag ? classes.active : ''}`}>
            <div className={classes['file-edit']}>
              <div
                className={`${classes['file-list']} ${
                  isFileSelected || drag ? classes.active : ''
                }`}>
                <ul>
                  {/* 임시저장일때 */}
                  {isServerFile?.files &&
                  isServerFile?.files.length > 0 &&
                  isDetailMode &&
                  !isReviseMode ? (
                    <>
                      {/* api에서 끌어오는 file */}
                      {isServerFile.files.map((item, index) => (
                        <li key={index}>
                          <span>{item.fileName}</span>
                          <button onClick={() => fileDeleteAPIHandler(item.id)}>
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </li>
                      ))}
                      {/* 로컬 state에서 가져오는 file */}
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
                <div>
                  <p>
                    첨부할 파일을 드래그하거나
                    <i className="fa-solid fa-paperclip"></i>
                  </p>
                  <label htmlFor="approval-attach-file"> 파일선택 </label>
                  <input
                    className={classes['approval-attach-file']}
                    id="approval-attach-file"
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                  />
                </div>
                <div className={classes['file-warning']}>
                  <span>
                    {' '}
                    <p>doc, docx, xls, xlsx, ppt, pptx, pdf</p> 파일만 첨부가능
                  </span>
                  <span>
                    {' '}
                    ( 파일 최대 용량 <p>50mb</p> ){' '}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Detail일때 */
        <div className={classes['approval-attachment']}>
          <h2>
            <i className="fa-solid fa-paperclip"></i>
            첨부파일
          </h2>
          <div className={classes['approval-attachment-item-download']}>
            <div className={classes['file-download']}>
              <ul>
                {data?.files && data?.files.length > 0 ? (
                  data.files.map((item, index) => (
                    <li key={index}>
                      <span>{item.fileName}</span>
                      {isSameUser && (
                        <>
                          <button onClick={() => fileDownloadHandler(item.id, item.fileName)}>
                            <i className="fa-solid fa-download"></i>
                          </button>
                          <button onClick={() => openPdfViewer(item)}>
                            <i className="fa-regular fa-file-pdf"></i>
                          </button>
                        </>
                      )}
                      {!isSameUser && (
                        <button onClick={() => openPdfViewer(item)}>
                          <i className="fa-regular fa-file-pdf"></i>
                        </button>
                      )}
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
      {isPdfViewerOpen && selectedFile && (
        <PdfViewerModal isOpen={isPdfViewerOpen} onClose={closePdfViewer} file={selectedFile} />
      )}
    </div>
  );
};

export default ApprovalAttachment;
