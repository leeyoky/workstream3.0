import React, { useState, useEffect } from 'react';
import Modal from '../Layout/Modal/Modal';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { Worker, Viewer, ZoomEvent } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PdfViewerModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  file: { id: number; fileName: string };
}> = ({ isOpen, onClose, file }) => {
  const [pdfUrl, setPdfUrl] = useState<string>('');

  useEffect(() => {
    const fetchPdfUrl = async () => {
      const downloadUrl = `${import.meta.env.VITE_REACT_APP_API_BASE_URL}approval/file/${file.id}`;

      try {
        const response = await fetch(downloadUrl);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setPdfUrl(objectUrl);
      } catch (error) {
        console.error('PDF URL 가져오기 실패:', error);
      }
    };

    fetchPdfUrl();
  }, [file]);

  const zoomPluginInstance = zoomPlugin();
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

  const handleZoom = (e: ZoomEvent) => {
    console.log('Zoom level:', e.scale);
  };

  return (
    <Modal isOpen={isOpen} className="pdfViewer_modal">
      <div className="pdf-viewer__xmark">
        <i className="fa-solid fa-xmark" onClick={onClose}></i>
      </div>
      {pdfUrl && (
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
          <div
            className="rpv-core__viewer"
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '800px',
              width: '750px',
            }}>
            <div
              style={{
                alignItems: 'center',
                backgroundColor: '#ffffff',
                display: 'flex',
                justifyContent: 'center',
              }}>
              <ZoomOutButton />
              <ZoomPopover />
              <ZoomInButton />
            </div>

            <div
              style={{
                flex: 1,
                overflow: 'hidden',
              }}>
              <Viewer fileUrl={pdfUrl} onZoom={handleZoom} plugins={[zoomPluginInstance]} />
            </div>
          </div>
        </Worker>
      )}
      <i className="fa-solid fa-xmar" onClick={onClose}></i>
    </Modal>
  );
};

export default PdfViewerModal;
