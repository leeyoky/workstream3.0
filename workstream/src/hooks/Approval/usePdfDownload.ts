import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useState } from 'react';

/**
 *  @description PDF 다운 기능
 *  @access 등록자만 가능
 */

const usePdfDownload = () => {
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);

  // pdf 모달 열기
  const handleShowPdfModal = () => {
    setIsPDFModalOpen(true);
  };
  // pdf 모달 닫기
  const handleClosePdfModal = () => {
    setIsPDFModalOpen(false);
  };

  const pdfDownloadHandler = () => {
    const element: HTMLElement = document.getElementById('approval')!;

    html2canvas(element, { scale: 3 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        format: 'a4',
        orientation: 'portrait',
        unit: 'mm',
      });

      const padding = 10; // You can adjust the padding value as needed
      const pdfWidth = 210 - 2 * padding;
      const pdfHeight = 297 - 2 * padding;

      pdf.addImage(imgData, 'PNG', padding, padding, pdfWidth, pdfHeight);
      pdf.save('DS품의서.pdf');
    });
  };

  return {
    isPDFModalOpen,
    handleShowPdfModal,
    handleClosePdfModal,
    pdfDownloadHandler,
  };
};

export default usePdfDownload;
