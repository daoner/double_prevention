import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import './style.css';

class Apply extends Component {
    render() {
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>授权许可</Breadcrumb.Item>
                    <Breadcrumb.Item>作业申请</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div>
                    作业申请
                </div>
            </div>
        )
    }
}

export default Apply;