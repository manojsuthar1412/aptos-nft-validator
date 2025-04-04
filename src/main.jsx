import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AptosWalletProvider } from "./AptosWalletContext";


ReactDOM.createRoot(document.getElementById('root')).render(
  <AptosWalletProvider>
    <App />
  </AptosWalletProvider>
);
