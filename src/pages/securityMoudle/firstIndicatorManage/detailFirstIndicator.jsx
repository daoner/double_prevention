/**
 * 一级指标详情
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumb, Form, Input, Button } from 'antd';
import './style.css';

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
                        <Form  labelCol={ {span: 6 }} wrapperCol={{ span: 14 }} disabled>
                            <Form.Item label="项目id">
                                <Input type="number" disabled  value="0001"/>
                            </Form.Item>
                            <Form.Item label="所属检查表">
                                <Input type="text" disabled  value="checktableid 456"/>
                            </Form.Item>
                            <Form.Item label="项目名">
                                <Input type="text" disabled  value="单位常规制度检查"/>
                            </Form.Item>
                            <Form.Item label="添加时间">
                                <Input type="text" disabled  value="2019-10-18"/>
                            </Form.Item>
                            <Form.Item label="是否删除">
                                <Input type="text" disabled  value="是"/>
                            </Form.Item>
                            <Form.Item label="删除时间">
                                <Input type="text" disabled  value="2019-10-18"/>
                            </Form.Item>
                            <Form.Item wrapperCol={{span: 4, offset:6}}>
                                <Link to="/main/firstIndicator/manage">
                                    <Button>返回</Button>
                                </Link>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailFirstIndicator;