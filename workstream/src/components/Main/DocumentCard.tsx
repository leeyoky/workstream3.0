const DocumentCard = () => {
  return (
    <div className="currentDoc-wrapper _card">
      <div className="inner-box inner-box_notice">
        <div className="inner-box__title">
          <i className="fa-solid fa-file"></i>
          최신문서
        </div>
        <div className="inner-box__content inner-box__content_notice">
          <ul className="document-card__table">
            <li>[한화생명금융서비스][2024][1월][정기점검][Metastream]</li>
          </ul>
          <ul className="document-card__table">
            <li>한국평가데이터_TeraStream_1월_정기점검문서</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
