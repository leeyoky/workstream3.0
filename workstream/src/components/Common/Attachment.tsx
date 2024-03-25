import { ChangeEvent, useState } from 'react';
import { serverFileData } from '../../types/File';

interface AttachmentProps {
  fileData?: serverFileData[];
  onFileChange: (files: File[]) => void;
  updateMode?: boolean;
}
const Attachment: React.FC<AttachmentProps> = ({ fileData, onFileChange, updateMode }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  // const { setApiFileList } = useUpdateFiles();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prevFiles => [...prevFiles, ...files]);
      onFileChange([...selectedFiles, ...files]);
    }
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    onFileChange([...selectedFiles, ...files]);
  };

  const dragEnterHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const fileDeleteHandler = (file: File) => {
    const confirmMsg = window.confirm('첨부파일을 삭제하시겠습니까?');
    if (confirmMsg) {
      setSelectedFiles(prevFiles => prevFiles.filter(prevFile => prevFile !== file));
      onFileChange(selectedFiles.filter(prevFile => prevFile !== file));
    }
  };

  return (
    <div
      className="attachment-wrapper"
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={e => e.preventDefault()}
      onDrop={dropHandler}>
      <span>
        <i className="fa-solid fa-paperclip"></i>
        첨부파일
      </span>
      <div className="attachment-item">
        <ul className="file-list">
          {selectedFiles.map((file, index) => (
            <li key={index}>
              {file.name}
              <button onClick={() => fileDeleteHandler(file)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </li>
          ))}
          {fileData?.map((file, index) => <li key={index}>{file.fileName}</li>)}
        </ul>
        {updateMode && (
          <div className="attachment-content">
            <p>
              첨부할 파일을 드래그하거나
              <i className="fa-solid fa-paperclip"></i>
            </p>
            <label htmlFor="attachment-attach-file"> 파일선택 </label>
            <input id="attachment-attach-file" type="file" onChange={handleFileChange} multiple />
          </div>
        )}
      </div>
    </div>
  );
};

export default Attachment;
