import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import './style.css';

class PreApprove extends Component {
    render() {
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>授权许可</Breadcrumb.Item>
                    <Breadcrumb.Item>作业审批</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div>
                作业审批
                </div>
            </div>
        )
    }
}

export default PreApprove;