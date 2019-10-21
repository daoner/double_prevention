/**
 * 一级指标详情
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumb, Form, Input, Button, Radio } from 'antd';

class DetailCheckTable extends Component {

    render() {
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>安全检查与隐患管理</Breadcrumb.Item>
                    <Breadcrumb.Item>检查表管理</Breadcrumb.Item>
                    <Breadcrumb.Item>检查表详情</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap">
                    <div style={{width:"80%", margin:"50px auto"}}>
                        <Form  labelCol={ {span: 6 }} wrapperCol={{ span: 14 }} disabled>
                            <Form.Item label="检查表id">
                                <Input type="number" disabled  value="0001"/>
                            </Form.Item>
                            <Form.Item label="检查表名">
                                <Input type="text" disabled  value="一个简单的检查表"/>
                            </Form.Item>
                            <Form.Item label="检查表编号">
                                <Input type="text" disabled  value="007"/>
                            </Form.Item>
                            <Form.Item label="检查表类别">
                                <Input type="text" disabled  value="定期检查表"/>
                            </Form.Item>
                            <Form.Item label="所属部门">
                                <Input type="text" disabled  value="编辑部"/>
                            </Form.Item>
                            <Form.Item label="添加时间">
                                <Input type="text" disabled  value="2019-10-18"/>
                            </Form.Item>
                            <Form.Item label="是否删除">
                                <Radio.Group disabled>
                                    <Radio value="是" checked>是</Radio>
                                    <Radio value="否">否</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="删除时间">
                                <Input type="text" disabled  value="2019-10-18"/>
                            </Form.Item>
                            <Form.Item wrapperCol={{span: 4, offset:6}}>
                                <Link to="/main/checktable/manage">
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

export default DetailCheckTable;