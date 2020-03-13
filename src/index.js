import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import { Provider } from 'react-redux';
import store from './plugins/redux';
import * as serviceWorker from './serviceWorker';
import 'leaflet/dist/leaflet.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWAj
serviceWorker.register();
//serviceWorker.unregister();
