import jsPDF from 'jspdf';

export interface serverFile {
  id: number;
  docNumber: string;
  docType: string;
  fileExtension: string;
  fileName: string;
  fileSize: number;
}

declare global {
  interface Window {
    jsPDF: typeof jsPDF;
  }
}
