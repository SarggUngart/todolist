import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRedux from "./AppRedux";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {BrowserRouter} from "react-router-dom";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <>
    <Provider store={store}>
      <BrowserRouter>
        <AppRedux/>
      </BrowserRouter>
    </Provider>
  </>
  // </React.StrictMode>
);


