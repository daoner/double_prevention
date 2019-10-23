/**
 * 下发整改
 */
import React, { Component } from 'react';
import { Breadcrumb,  Select, Button, message} from 'antd';
import { Form, Input,  DatePicker } from 'antd';
import axios from 'axios';
import Qs from 'qs';
import { Redirect } from 'react-router-dom';

import { formateDate } from '../../../utils/dateUtil';  //引入格式化时间的方法

class ToRectify extends Component {
    constructor(props) {
        super(props);
        //state
        this.state = {
            isSuccess: false,
            allDept:[]      //所有部门的id和name
        }
        //绑定this
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let deptlist;   //所有部门的list
        // 获取所有部门的 id 和 name
        axios.get('/api/department/getAllDept').then(res=>{
            if(res.data.status === 1) {
                deptlist = res.data.list;
            }
        }).catch(error=>{
            message.error(error.message,2);
        })
        this.setState({
            allDept: deptlist || []
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                //搜集需要提交的数据
                const data={
                    id:this.props.match.params.id,
                    startDate: formateDate(new Date(values.startDate._d), 'yyyy-MM-dd'),
                    endDate: formateDate(new Date(values.endDate._d),'yyyy-MM-dd'),
                    deptId: values.deptId,
                    username: values.username
                };
                // console.log(data);
                //提交数据到后台
                axios.post('/url',Qs.stringify(data),{
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
                    }
                }).then(res=>{
                    if(res.data.status === 1) { //提交成功处理
                        message.success('下发成功',2);
                        this.setState({ isSuccess: true });
                    }else {
                        message.success('下发失败',2);
                    }
                }).catch(error=>{
                    message.error(error.message,2);
                })
            }else {
                // console.log(err,values)
                message.info('请正确填写必要信息!')
            }
        });
    }

    /**
     * render
     */
    render() {
        // console.log(this.props.match.params.id)
        if(this.state.isSuccess) {
            return <Redirect to="/main/hiddentTrouble/manage" />
        }
        

        const { getFieldDecorator } = this.props.form;
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>安全检查与隐患管理</Breadcrumb.Item>
                    <Breadcrumb.Item>检查表一览</Breadcrumb.Item>
                    <Breadcrumb.Item>检查结果录入</Breadcrumb.Item>
                </Breadcrumb>
                <div className="contentWrap" >
                    <Form style={{marginTop:"50px"}} labelCol={{span:6}} wrapperCol={{span: 14}} onSubmit={this.handleSubmit} >

                        {/* 检查日期  */}
                        <Form.Item label="整改下发日期">
                            {getFieldDecorator('startDate', {
                            rules: [{ required: true, message: '请确定整改下发日期!' }],
                            })(
                                <DatePicker />,
                            )}
                        </Form.Item>

                        {/* 检查人信息 */}
                        <Form.Item label="整改负责人">
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入检查人!' }],
                            })(
                                <Input maxLength="10" placeholder="杜甫" />,
                            )}
                        </Form.Item>
                        {/* 参检人 */}
                        <Form.Item label="整改负责部门" wrapperCol={{span:6}}>
                            {getFieldDecorator('deptId', {
                                rules: [{ required: true, message: '请选择被检单位!' }],
                            })(
                                <Select
                                    placeholder="select a deportment"
                                    // onChange={(e,v)=>{console.log(e,v,'selet change ')}}
                                >
                                    {
                                        this.state.allDept.map(item=>(
                                            <Select.Option value={item.id}>{item.name}</Select.Option>
                                        ))
                                    }
                                </Select>  
                            )}
                        </Form.Item>

                        <Form.Item label="整改截至日期">
                            {getFieldDecorator('endDate', {
                            rules: [{ required: true, message: '请确定整改下发日期!' }],
                            })(
                                <DatePicker />,
                            )}
                        </Form.Item>

                        
                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" htmlType="submit">
                                下发整改
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
export default Form.create({ name: 'rectify_form' })(ToRectify);

