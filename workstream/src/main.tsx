import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import store from './store/index.js'
import './css/index.css'
import './css/login.css'
import { AuthContextProvider } from './store/auth-context';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'


const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
      <AuthContextProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>,
      </AuthContextProvider>
    </BrowserRouter>
    </PersistGate>
  </Provider>
)
