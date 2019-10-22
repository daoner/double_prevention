/**
 * 安全检查结果详情
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumb, Form, Input, Button, Radio } from 'antd';


class DetailCheckResult extends Component {

    render() {
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>安全检查与隐患管理</Breadcrumb.Item>
                    <Breadcrumb.Item>安全检查结果</Breadcrumb.Item>
                    <Breadcrumb.Item>检查详情</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap">
                    <div style={{width:"80%", margin:"50px auto"}}>
                        <h2>检查表名</h2>
                        <section>
                            <h3>一级指标2</h3>
                            <p>二级指标1</p>
                            <p>二级指标2222222222222</p>
                            <p>二级指标333333333333333</p>
                            <p>二级指标444444444444444</p>
                            <p>二级指标55555555555</p>
                        </section>
                        <section>
                            <h3>一级指标2</h3>
                            <p>二级指标1</p>
                            <p>二级指标2222222222222</p>
                            <p>二级指标333333333333333</p>
                            <p>二级指标444444444444444</p>
                            <p>二级指标55555555555 <span>不合格</span></p>
                        </section>
                            <Form.Item wrapperCol={{span: 4, offset:6}}>
                                <Link to="/main/checktable/result">
                                    <Button>返回</Button>
                                </Link>
                            </Form.Item>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailCheckResult;