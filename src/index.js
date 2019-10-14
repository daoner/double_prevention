import React from 'react';
import ReactDOM from 'react-dom';

import 'antd/dist/antd.css';

import App from './App';
import './index.css';

import memeryUtil from './utils/memeryUtil';
import storageUtil from './utils/storageUtil';

/***
 * 使用技术：
 * axios
 * redux  
 * react-redux
 * redux-thunk(异步中间件)
 * react-router
 * react-router-dom
 * antd
 * prop-types
 * immutalbe
 * （styled-components，emmm算了不用吧）
 */

memeryUtil.user = storageUtil.getUser();
 
ReactDOM.render(<App />, document.getElementById('root'));

