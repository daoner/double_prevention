import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import './style.css';

class AccidentStatistic extends Component {
    render() {
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>事故管理与统计</Breadcrumb.Item>
                    <Breadcrumb.Item>统计分析</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div>
                    统计分析，这里要绘图
                </div>
            </div>
        )
    }
}

export default AccidentStatistic;