/**
 * 一级指标详情
 */
import React, { Component } from 'react';

import { Breadcrumb } from 'antd';


class DetailFirstIndicator extends Component {

    render() {
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>安全检查与隐患管理</Breadcrumb.Item>
                    <Breadcrumb.Item>检查标准管理</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap">
                    <div style={{width:"80%", margin:"0 auto"}}>

                    </div>
                </div>
            </div>
        )
    }
}

export default DetailFirstIndicator;