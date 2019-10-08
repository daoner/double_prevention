import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import './style.css';

class DangerManage extends Component {
    render() {
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>风险管理与评估</Breadcrumb.Item>
                    <Breadcrumb.Item>危险源管理</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div>
                危险源管理
                </div>
            </div>
        )
    }
}

export default DangerManage;