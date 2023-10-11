const DocumentCard = () => {
  return (
    <div className='currentDoc-wrapper _card'>
    <div className='inner-box inner-box_notice'>
      <div className='inner-box__title'>
      <i className="fa-solid fa-file"></i>
      최신문서
      </div>
      <div className="inner-box__content inner-box__content_notice">
        <ul className="document-card__table">
          <li>React 기초 문서</li>
          <li>2023-10-10</li>
          <li>김춘배</li>
        </ul>
        <ul className="document-card__table">
          <li>Next.js 입문</li>
          <li>2023-10-10</li>
          <li>김춘배</li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default DocumentCard