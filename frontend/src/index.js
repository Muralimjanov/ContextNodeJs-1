import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MyState } from "./context/my-context/my-state"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyState>
      <App />
    </MyState>
  </React.StrictMode>
);
