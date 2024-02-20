const Attachment = () => {
  return (
    <div className="attachment-wrapper">
      <span>
        <i className="fa-solid fa-paperclip"></i>
        첨부파일
      </span>
      <div className="attachment-content">
        <p>
          첨부할 파일을 드래그하거나
          <i className="fa-solid fa-paperclip"></i>
        </p>
        <label htmlFor="attachment-attach-file"> 파일선택 </label>
      </div>
    </div>
  );
};

export default Attachment;
