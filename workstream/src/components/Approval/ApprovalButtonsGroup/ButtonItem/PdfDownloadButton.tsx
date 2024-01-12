import usePdfDownload from '../../../../hooks/Approval/usePdfDownload';

/**
 * PDF 다운 버튼
 * @returns
 */
const PdfDownloadButton = () => {
  const { pdfDownloadHandler } = usePdfDownload();
  return (
    <button className="btn btn-green-line" onClick={pdfDownloadHandler}>
      <span>PDF다운</span>
      <i className="fa-solid fa-file-pdf"></i>
    </button>
  );
};

export default PdfDownloadButton;
