import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import './style.css';

class AppluRecord extends Component {
    render() {
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>授权许可</Breadcrumb.Item>
                    <Breadcrumb.Item>申请记录</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div>
                    申请记录 list
                </div>
            </div>
        )
    }
}

export default AppluRecord;