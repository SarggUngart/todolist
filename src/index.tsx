import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRedux from "./AppRedux";
import {Provider} from "react-redux";
import {store} from "./store/store";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <>
      {/*<App/>*/}
      {/*<AppUseReducer/>*/}
      <Provider store={store}>
        <AppRedux/>
      </Provider>

    </>
  </React.StrictMode>
);


