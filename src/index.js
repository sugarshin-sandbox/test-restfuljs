import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import APIBase from './apis/Base';
import dotenv from 'dotenv';

dotenv.config();

global.fetch = null;
require('whatwg-fetch');
APIBase.apiBase = process.env.API_BASE;

ReactDOM.render(<App />, document.querySelector('#app-root'));
