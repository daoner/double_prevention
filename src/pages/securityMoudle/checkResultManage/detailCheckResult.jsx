/**
 * 安全检查结果详情
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Qs from 'qs';

import { Breadcrumb, Form, Input, Button, Radio, message } from 'antd';
import './style.css';

class DetailCheckResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkTableName: '',

            firstList:[],

            checkDate: '',
            type: '',
            deptedName: '',
            otherPerson: '',
            isQualified: '',
            desc: '',
            userName: '',
        }
    }
    componentDidMount() {
        const ss = {inputId: this.props.match.params.id };
        console.log(ss);
        axios.post('/api/input/getInputAllInfoById', Qs.stringify({inputId: this.props.match.params.id }),{
            headers: {
                'Content-Type':'application/x-www-form-urlencoded;'
            }
        }).then(res=>{
            const data = res.data;
            if(data.status === 1) {
                this.setState({
                    checkTableName: data.data.checkTableName,
                    firstList: data.data.firstList,

                    checkDate: data.data.checkDate,
                    type: data.data.type,
                    deptedName: data.data.deptedName,
                    otherPerson: data.data.otherPerson,
                    isQualified: data.data.isQualified,
                    desc: data.data.desc,
                    userName: data.data.userName
                })
            }else {
                message.error(data.message || '获取信息失败');
            }
        }).catch(error=>{
            message.error(error.message);
        })
    }

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
                        <table className="result-table">
                            <caption align="top">{this.state.checkTableName}</caption>
                            <tbody>
                                <tr>
                                    <td colspan="3">项目</td>
                                    <td colspan="7">检查内容</td>
                                    <td colspan="2">检查结果</td>
                                </tr>
                                {
                                    this.state.firstList.map((item1,index)=>{
                                          let list =   item1.secondList.map((item2,index2)=>{
                                                if(index === 0) {
                                                    return (<tr>
                                                        <td rowspan="3" colspan="3">{item1.project}</td>
                                                        <td colspan="7">{item2.content}</td>
                                                        <td colspan="2">{item2.isQualified? '合格': '不合格'}</td>
                                                    </tr>)
                                                }else {
                                                    return (
                                                        <tr>
                                                            <td colspan="7">{item2.content}</td>
                                                            <td colspan="2">{item2.isQualified? '合格': '不合格'}</td>
                                                        </tr>
                                                    )
                                                }
                                                
                                            })
                                            return list;
                                    })
                                }
                                {/* <tr>
                                    <td rowspan="3" colspan="3">一级指标2</td>
                                    <React.Fragment>
                                        <td colspan="7">吃胡萝卜</td>
                                        <td colspan="2">不合格</td>
                                    </React.Fragment>
                                </tr>
                                <tr><td colspan="7">吃胡萝卜</td><td colspan="2">不合格</td></tr>
                                <tr><td colspan="7">吃胡萝卜</td><td colspan="2">不合格</td></tr> */}

                               
                                <tr>
                                    <td colspan="12"></td>
                                </tr>
                                <tr>
                                    <td colspan="2">检查类型</td>
                                    <td colspan="2">{ this.state.type}</td>
                                    <td colspan="2">被检单位</td>
                                    <td colspan="2">{ this.state.deptedName}</td>
                                    <td colspan="2">检查人</td>
                                    <td colspan="2">{ this.state.userName}</td>
                                </tr>
                                <tr>
                                    <td colspan="2">是否合格</td>
                                    <td colspan="2">{this.state.isQualified? '合格': '不合格'}</td>
                                    <td colspan="2">检查时间</td>
                                    <td colspan="2">{this.state.checkDate}</td>
                                    <td colspan="2">参检人</td>
                                    <td colspan="2">{this.state.otherPerson}</td>
                                </tr>
                                <tr>
                                    <td colspan="3">不合格说明</td>
                                    <td colspan="9">{this.state.desc}</td>
                                </tr>
                            </tbody>
                        </table>
                        <Form.Item wrapperCol={{span: 4, offset:3}}>
                            <Button style={{marginRight: "30px"}}>打印</Button>
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