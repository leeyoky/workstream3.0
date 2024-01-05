import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store';

/**
 *  @description PDF 다운 기능
 *  @access 등록자만 가능
 */

const usePdfDownload = () => {
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const currentDate = new Date();
  const dateString = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;
  const { id = '' } = useParams<string>();
  const timeString = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
  const userInfo = useSelector((state: RootState) => state.user.userInfo.empNo);
  const waterMark = `${id} date/${dateString} ${timeString} user/${userInfo}`;

  // pdf 모달 열기
  const handleShowPdfModal = () => {
    setIsPDFModalOpen(true);
  };
  // pdf 모달 닫기
  const handleClosePdfModal = () => {
    setIsPDFModalOpen(false);
  };

  const pdfDownloadHandler = async () => {
    const element: HTMLElement = document.getElementById('approval')!;
    const pdf = new jsPDF({
      format: 'a4',
      orientation: 'portrait',
      unit: 'mm',
    });

    const padding = 10;
    const pdfWidth = 210 - 2 * padding;
    const pdfHeight = 297 - 2 * padding;

    pdf.setTextColor(100, 100, 100);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);

    // 첫 번째 페이지 추가
    html2canvas(element, { scale: 3 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      pdf.text(waterMark, 10, 8);
      pdf.addImage(imgData, 'PNG', padding, padding, pdfWidth, pdfHeight);

      // 두 번째 페이지 추가
      pdf.addPage();
      const editorElement = document.querySelector(
        '.ck.ck-editor__editable.ck-read-only',
      ) as HTMLElement;

      console.log(editorElement);

      html2canvas(editorElement, { scale: 3 }).then(nextCanvas => {
        const nextImgData = nextCanvas.toDataURL('image/png');
        pdf.addImage(nextImgData, 'PNG', padding, padding, pdfWidth, pdfHeight);
      });

      // PDF 저장
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
