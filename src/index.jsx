import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import './index.css';
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from "antd";
import App from './App';
ReactDOM.render(
    <HashRouter>
        <ConfigProvider locale={zhCN}>
            <App />
        </ConfigProvider>
    </HashRouter>,
    document.getElementById('root')
);

