/**
 * 一级指标详情
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumb, Form, Input, Button, Radio, message } from 'antd';
import axios from 'axios';
import Qs from 'qs';

class DetailSecondIndicator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            project: '',
            content: '',
            addDate: '',
            isDelete: false,
            deleteDate: ''
        }

        this.handleGetDetail = this.handleGetDetail.bind(this);
    }
    componentDidMount() {
        this.handleGetDetail();
    }

    handleGetDetail() {
        axios.post('/api/secondLevelIndicator/getDetail',Qs.stringify({
            secondLevelIndicatorId: this.props.match.params.id
        }),{
            headers: {
                'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).then(res=>{
            if(res.data.status === 1) {
                const data =res.data.data;
                this.setState({
                    id: data.id,
                    project: data.project,
                    content: data.content,
                    addDate: data.addDate,
                    isDelete: data.isDelete,
                    deleteDate: data.deleteDate
                })
            }else {
                message.error(res.data.message || '获取信息失败');
            }
        }).catch(error=>{
            message.error(error.message);
        })
    }
    

    render() {
        const id = this.props.match.params.id;
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
                                <Input type="number" disabled  value={id}/>
                            </Form.Item>
                            <Form.Item label="所属一级指标">
                                <Input type="text" disabled  value={this.state.project}/>
                            </Form.Item>
                            <Form.Item label="指标内容">
                                <Input type="text" disabled  value={this.state.content}/>
                            </Form.Item>
                            <Form.Item label="添加时间">
                                <Input type="text" disabled  value={this.state.addDate}/>
                            </Form.Item>
                            <Form.Item label="是否删除">
                                <Radio.Group disabled>
                                    <Radio value="是" checked={ this.state.isDelete }>是</Radio>
                                    <Radio value="否" checked={ !this.state.isDelete }>否</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="删除时间">
                                <Input type="text" disabled  value={ this.state.isDelete ? this.state.deleteDate : ''}/>
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