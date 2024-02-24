import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CommentProvider from "./context/CommentProvider";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <CommentProvider>
     <App />
    </CommentProvider>
    </BrowserRouter>
  </React.StrictMode>
);