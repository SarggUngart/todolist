import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App';
import reportWebVitals from "./reportWebVitals";
import './index.css';
import React from 'react';
import App__UseReducer from "./App__UseReducer";

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
const app = (
  <StrictMode>
       <App__UseReducer />
     </StrictMode>
);

root.render(app);

reportWebVitals();