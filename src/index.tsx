import {createRoot} from 'react-dom/client';
import './index.css';
import React from 'react';
import App__Redux from "./App__Redux";
import {Provider} from "react-redux";
import {store} from "./store/store";

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
const app = (
  <Provider store={store}>
    <App__Redux/>
  </Provider>
);

root.render(app);
