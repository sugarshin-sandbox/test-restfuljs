import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import APIBase from './apis/Base';

global.fetch = null;
require('whatwg-fetch');
APIBase.apiBase = 'http://localhost:3000';

ReactDOM.render(<App />, document.querySelector('#app-root'));
