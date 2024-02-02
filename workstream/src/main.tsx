import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import store from './store/index.js';
import './css/index.css';
import './css/login.css';
import './css/button.css';
import './css/mainPage.css';
import './components/TextEditor.css';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      {/* StrictMode를 사용하면 컴포넌트가 두번 돌아감 
      배포 시에는 정상 작용하고, 개발 모드일때만 적용 됨. */}
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
);
