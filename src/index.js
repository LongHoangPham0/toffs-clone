import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from "react-dom/client";
import * as serviceWorker from './serviceWorker';
// import "./scss/style.scss";
import { lazyWithRetry } from './Utils/LazyLoad';

const App = lazyWithRetry(() => import('./App'));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
