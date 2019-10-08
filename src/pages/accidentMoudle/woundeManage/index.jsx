import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import './style.css';

class WoundeManage extends Component {
    render() {
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>事故管理与统计</Breadcrumb.Item>
                    <Breadcrumb.Item>人员伤亡</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div>
                    人员伤亡 。。。death
                </div>
            </div>
        )
    }
}

export default WoundeManage;