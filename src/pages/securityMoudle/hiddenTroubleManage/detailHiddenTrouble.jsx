/**
 * 隐患
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Qs from 'qs'

import { Breadcrumb, Form, Input, Button, Radio, message } from 'antd';

class DetailHiddenTrouble extends Component {

    constructor(props){
        super(props);
        this.state = {
            hdDetail:{}
        }

    }
    componentDidMount(){
        axios.post('/api/input/getDetailHiddenDanger',Qs.stringify({ id:this.props.match.params.id}),{
            headers: {
                'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).then(res=>{
            //  将值给hdDetail
            if(res.data.status === 1) {
                this.setState({
                    hdDetail: res.data.data
                })
            }
            /*
                id

            */
            //
        }).catch(error=>{
            message.error(error.message);
        })
    }

    render() {
        const hdDetail = this.state.hdDetail;

        // console.log(this.props.match.params.id) // 路由传过来的id

        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>安全检查与隐患管理</Breadcrumb.Item>
                    <Breadcrumb.Item>隐患整改信息</Breadcrumb.Item>
                    <Breadcrumb.Item>隐患详情</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap">
                    <div style={{width:"80%", margin:"50px auto"}}>
                        <Form  labelCol={ {span: 6 }} wrapperCol={{ span: 14 }} disabled>
                            <Form.Item label="隐患id">
                                <Input type="number" disabled  value={this.props.match.params.id}/>
                            </Form.Item>
                            <Form.Item label="隐患类型">
                                <Input type="text" disabled  value={hdDetail.type}/>
                            </Form.Item>
                            <Form.Item label="隐患图片">
                                <img src={hdDetail.hPhoto} style={{maxWidth:"400px", maxHeight:"400px"}} alt="隐患图片" />
                                {/* <Input type="text" disabled  value="图片显示"/> */}
                            </Form.Item>
                            <Form.Item label="整改状态">
                                <Input type="text" disabled  value={hdDetail.status}/>
                            </Form.Item>
                            <Form.Item label="下发时间">
                                <Input type="text" disabled  value={hdDetail.startDate}/>
                            </Form.Item>
                            <Form.Item label="截止时间">
                                <Input type="text" disabled  value={hdDetail.endDate}/>
                            </Form.Item>
                            <Form.Item label="整改说明">
                                <Input type="text" disabled  value={hdDetail.desc}/>
                            </Form.Item>
                            <Form.Item label="是否归档">
                                <Input type="text" disabled  value={hdDetail.isFile ? '是' : '否'}/>
                            </Form.Item>
                            <Form.Item label="完成时间">
                                <Input type="text" disabled  value={hdDetail.finishDate}/>
                            </Form.Item>
                            <Form.Item label="隐患内容">
                                <Input type="text" disabled  value={hdDetail.content}/>
                            </Form.Item>
                            <Form.Item label="下发人">
                                <Input type="text" disabled  value={hdDetail.dispatchUserName}/>
                            </Form.Item>
                            <Form.Item label="下发单位">
                                <Input type="text" disabled  value={hdDetail.dispatchDeptName}/>
                            </Form.Item>
                            <Form.Item label="整改单位">
                                <Input type="text" disabled  value={hdDetail.deptName}/>
                            </Form.Item>
                            <Form.Item wrapperCol={{span: 4, offset:6}}>
                                <Link to="/main/hiddentTrouble/manage">
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

export default DetailHiddenTrouble;