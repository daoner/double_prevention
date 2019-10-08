import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import './style.css';

class AccidentManage extends Component {
    render() {
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>事故管理与统计</Breadcrumb.Item>
                    <Breadcrumb.Item>事故信息管理</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div>
                   事故信息
                </div>
            </div>
        )
    }
}

export default AccidentManage;