/**
 * 一级指标详情
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Breadcrumb, Form, Input, Button, Radio, message } from 'antd';
import './style.css';


class DetailCheckInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDate: {}, //细节信息
        }
    }


    componentDidMount() {
        //获取所有一级和二级的检查条目
        axios.post('/api/checkTable/getAllInfoById',{ checkTableId: this.props.match.params.id }).then(res=>{
            this.setState({
                detailDate: res.data
            })
        }).catch(error=>{
            message.error(error.message,2);
        })
    }

    render() {
        const firstList = this.state.detailDate.firstList;
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>安全检查与隐患管理</Breadcrumb.Item>
                    <Breadcrumb.Item>检查表录入</Breadcrumb.Item>
                    <Breadcrumb.Item>检查表详情</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap">
                    <div style={{width:"80%", margin:"50px auto"}}>
                        <Form  labelCol={ {span: 6 }} wrapperCol={{ span: 14 }} disabled>
                            {
                                firstList ? firstList.map(item1=>(
                                    <Form.Item label={item1.project}>
                                        {
                                            item1.secondList ? item1.secondList.map(item2=>(
                                                <Input type="text" disabled  value={item2.content}/>
                                            )) : null
                                        }
                                    </Form.Item>
                                )) : null
                            }
                            {/* <Form.Item label="一级表项">
                                <Input type="text" disabled  value="作息生活检查表"/>
                                <Input type="text" disabled  value="作息生活检查表"/>
                                <Input type="text" disabled  value="作息生活检查表"/>
                                <Input type="text" disabled  value="作息生活检查表"/>
                                <Input type="text" disabled  value="作息生活检查表"/>
                            </Form.Item> */}
                            <br/>
                            <br/>
                            <br/>
                            <Form.Item label="检查表类别">
                                <Input type="text" disabled  value={this.state.detailDate.type}/>
                            </Form.Item>
                            <Form.Item label="所属部门">
                                <Input type="text" disabled  value={this.state.detailDate.deptName}/>
                            </Form.Item>
                            <Form.Item label="添加时间">
                                <Input type="text" disabled  value={this.state.detailDate.addDate}/>
                            </Form.Item>
                            <Form.Item label="是否删除">
                                <Radio.Group disabled>
                                    <Radio value="是" checked={this.state.detailDate.isDelete}>是</Radio>
                                    <Radio value="否" checked={!this.state.detailDate.isDelete}>否</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="删除时间">
                                <Input type="text" disabled  value={this.state.detailDate.isDelete? this.state.detailDate.deleteTime : ''}/>
                            </Form.Item>
                            <Form.Item wrapperCol={{span: 4, offset:6}}>
                                <Link to="/main/checktable/Input">
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

export default DetailCheckInput;

/*

蔡杰 17:50:44
{
    "checkTableName": "name",
    "checkTableId": 1,

    type
    identifier
    deptName
    addDate
    isDelete
    deleteDate

    "firstList": [
        {
            "firstProject": "你好",
            "secondList": [
                {
                    "secondId": 2,
                    "content": "哈哈哈"
                },
                {
                    "secondId": 3,
                    "content": "哈哈哈"
                },
                {
                    "secondId": 4,
                    "content": "哈哈哈"
                },
                {
                    "secondId": 5,
                    "content": "哈哈哈"
                }
            ],
            "firstId": 1
        },
        {
            "firstProject": "3",
            "secondList": [
                {
                    "secondId": 7,
                    "content": "3"
                }
            ],
            "firstId": 3
        },
        {
            "firstProject": "4",
            "secondList": [
                {
                    "secondId": 8,
                    "content": "4"
                }
            ],
            "firstId": 4
        },
        {
            "firstProject": "5",
            "secondList": [
                {
                    "secondId": 9,
                    "content": "5"
                }
            ],
            "firstId": 5
        },
        {
            "firstProject": "6",
            "secondList": [
                {
                    "secondId": 10,
                    "content": "6"
                }
            ],
            "firstId": 6
        },
        {
            "firstProject": "7",
            "secondList": [],
            "firstId": 7
        }
    ]
}





*/