import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import './style.css';

class RoleManage extends Component {
    render() {
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>系统维护与管理</Breadcrumb.Item>
                    <Breadcrumb.Item>角色管理</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div style={{height:"200px",background: "#fff"}}>
                    角色管理
                </div>
            </div>
        )
    }
}

export default RoleManage;