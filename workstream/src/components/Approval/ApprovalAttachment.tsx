import React, { useEffect, useState } from 'react';
import classes from '../../pages/Approval/Approval.module.css';

const ApprovalAttachment = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [drag, setDrag] = useState(false);

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

    const files = Array.from(e.dataTransfer.files); // 드래그 앤 드롭으로 선택한 파일 목록을 배열로 변환
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  }

  useEffect(() => {
    setIsFileSelected(selectedFiles.length > 0);
  }, [selectedFiles]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files); // 선택한 파일 목록을 배열로 변환
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    }
  };

  const handleFileDelete = (file: File) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((prevFile) => prevFile !== file));
  };

  return (
    <div className={classes["approval-create-wrapper"]}>
      <div
        className={classes["approval-attachment"]}
        onDragEnter={dragEnterHandler}
        onDragLeave={dragLeaveHandler}
        onDragOver={(e) => e.preventDefault()}
        onDrop={dropHandler}
      >
        <div className={`${classes["approval-attachment-item"]} ${drag ? classes.active : ''}`}>
          <div className={classes["file-edit"]}>
            <div className={`${classes["file-list"]} ${isFileSelected || drag ? classes.active : ''}`}>
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index}>
                    {file.name}
                    <button onClick={() => handleFileDelete(file)}>
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className={classes['file-info']} >
              <p>
                첨부할 파일을 드래그하거나 <i className="fa-solid fa-paperclip"></i>
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
    </div>
  );
};

export default ApprovalAttachment;
