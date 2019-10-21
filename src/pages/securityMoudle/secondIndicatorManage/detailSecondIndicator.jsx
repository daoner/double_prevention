/**
 * 一级指标详情
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumb, Form, Input, Button, Radio } from 'antd';

class DetailSecondIndicator extends Component {

    render() {
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>安全检查与隐患管理</Breadcrumb.Item>
                    <Breadcrumb.Item>二级指标管理</Breadcrumb.Item>
                    <Breadcrumb.Item>标准详情</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap">
                    <div style={{width:"80%", margin:"50px auto"}}>
                        <Form  labelCol={ {span: 6 }} wrapperCol={{ span: 14 }} disabled>
                            <Form.Item label="指标id">
                                <Input type="number" disabled  value="0001"/>
                            </Form.Item>
                            <Form.Item label="所属一级指标">
                                <Input type="text" disabled  value="checktableid 456"/>
                            </Form.Item>
                            <Form.Item label="指标内容">
                                <Input type="text" disabled  value="单位常规制度检查"/>
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
                                <Link to="/main/secondIndicator/manage">
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

export default DetailSecondIndicator;