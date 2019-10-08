import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import './style.css';

class RiskStatistic extends Component {
    render() {
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>风险管理与评估</Breadcrumb.Item>
                    <Breadcrumb.Item>统计分析</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div>
                    风险 xxx统计分析
                </div>
            </div>
        )
    }
}

export default RiskStatistic;