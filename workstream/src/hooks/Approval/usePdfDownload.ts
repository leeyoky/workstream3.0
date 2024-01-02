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

  const pdfDownloadHandler = () => {
    const element: HTMLElement = document.getElementById('approval')!;

    html2canvas(element, { scale: 3 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        format: 'a4',
        orientation: 'portrait',
        unit: 'mm',
      });
      console.log(pdf.getFontList());

      const padding = 10; // You can adjust the padding value as needed
      const pdfWidth = 210 - 2 * padding;
      const pdfHeight = 297 - 2 * padding;

      // 워터마크 추가
      // TODO: font 깨지는 문제
      pdf.setTextColor(100, 100, 100);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);

      pdf.text(waterMark, 10, 8);

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
