// AlertManager.tsx
import React, { ReactNode, useState } from 'react';
import Alert from '../Layout/Alert/Alert';

interface AlertManagerProps {
  children?: ReactNode;
}

const AlertManager: React.FC<AlertManagerProps> = ({ children }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'confirm' | 'alert'>('confirm');

  const showAlertMessage = (message: string, type: 'confirm' | 'alert' = 'confirm') => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  console.log('showAlertMessage', showAlertMessage);
  

  return (
    <>
      {children}
      {showAlert && <Alert message={alertMessage} type={alertType} onClose={closeAlert} />}
    </>
  );
};


export default AlertManager;
