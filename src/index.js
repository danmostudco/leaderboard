import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
import './scss/main.scss';

const container = document.getElementById('container');
ReactDOM.render(<App></App>, container);

if (module.hot) {
    module.hot.accept();
}