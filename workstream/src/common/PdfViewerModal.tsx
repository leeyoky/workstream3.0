import React, { useState, useEffect } from 'react';
import Modal from '../Layout/Modal/Modal';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import { Worker, Viewer, ZoomEvent } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { getFileData } from '../api/axios';
import { AxiosResponse } from 'axios';

const PdfViewerModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  file: { id: number; fileName: string };
}> = ({ isOpen, onClose, file }) => {
  const [pdfUrl, setPdfUrl] = useState<string>('');

  useEffect(() => {
    const fetchPdfUrl = async () => {
      try {
        const response: AxiosResponse<Blob> = await getFileData(file.id);
        const blob = response.data;
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
  const thumbnailPluginInstance = thumbnailPlugin();
  const { Thumbnails } = thumbnailPluginInstance;
  const fullScreenPluginInstance = fullScreenPlugin();
  const { EnterFullScreen } = fullScreenPluginInstance;

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
          <div className="rpv-core__viewer">
            {/* 확대/ 축소 */}
            <div className="react-pdf-viewer__header">
              <ZoomOutButton />
              <ZoomPopover />
              <ZoomInButton />
              <EnterFullScreen />
            </div>
            {/* 썸네일 및 화면 */}
            <div className="react-pdf-viewer__content">
              <div className="react-pdf-viewer__thumnails">
                <Thumbnails />
              </div>
              <div className="react-pdf-viewer__pdf-pages">
                <Viewer
                  fileUrl={pdfUrl}
                  onZoom={handleZoom}
                  plugins={[zoomPluginInstance, thumbnailPluginInstance, fullScreenPluginInstance]}
                />
              </div>
            </div>
          </div>
        </Worker>
      )}
      <i className="fa-solid fa-xmar" onClick={onClose}></i>
    </Modal>
  );
};

export default PdfViewerModal;
