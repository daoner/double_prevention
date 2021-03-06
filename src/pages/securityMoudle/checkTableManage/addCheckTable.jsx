import React, {Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';

import { Redirect } from 'react-router-dom';
import { Form,  Input, Button, Radio, Breadcrumb, message, Select } from 'antd';
import axios from 'axios';
import Qs from 'qs';

class NormalLoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allDept:[]
        }
    }

    componentDidMount() {
        // 获取所有部门的 id 和 name
        axios.get('/api/department/getAllDept').then(res=>{
            if(res.data.status == 1) {
                this.setState({
                    allDept: res.data.list
                })
            }
        }).catch(error=>{
            message.error(error.message,2);
        })
        
    }


    /**
     * 表单提交
     */
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err) {
                console.log('Received values of form: ', values);
                /**
                    |参数			|是否必选  |类型     |说明
                    |name        |Y        |string  |检查表名
                    |identifier  |Y	       |string  |检查表编号
                    |type        |Y		   |string  |检查表类型
                    |depId       |Y        |int     |所属门
                */
                const formData = {      //表单数据
                    name: values.name,
                    identifier: values.identifier,
                    type: values.type,
                    deptId: values.deptId
                }
                axios.post('/api/checkTable/insert',Qs.stringify(formData),{
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded;'
                    }
                }).then(res=> {
                    const data = res.data;
                    if(data.status === 1) {
                        message.success('添加成功');
                        this.props.changeSubmitSuccess(true);       //提交成功，修改submitSuccess状态 true，重定向到其他页面
                    }else {
                        message.error('添加失败');
                    }    
                }).catch(error=>{
                    message.error(error.message);
                });
            }else {
                message.info('请正确填写必要信息!')
            }
        });
    };
    

    componentWillUnmount() {
        this.props.changeSubmitSuccess(false);
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };


        // 是否禁用表单
        const formDisabled = false;
        // 提交成功的话，重定向到列表界面
        const { submitSuccess } = this.props;
        if(submitSuccess) {
            return <Redirect to="/main/checktable/manage" />
        }


        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>安全检查与隐患管理</Breadcrumb.Item>
                    <Breadcrumb.Item>检查表管理</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap" style={{paddingTop: "50px"}}>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="检查表名">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入检查表名!' }],
                        })(
                            <Input placeholder="检查表名" disabled={formDisabled}/>,
                        )}
                        </Form.Item>
                        <Form.Item label="检查表编号">
                        {getFieldDecorator('identifier', {
                            rules: [{ required: true, message: '请输入检查表编号!' }],
                        })(
                            <Input placeholder="编号"  disabled={formDisabled} />,
                        )}
                        </Form.Item>

                        <Form.Item label="检查表类型">
                        {getFieldDecorator('type', {
                            rules: [{ required: true,  message: '请输入检查表类型!' }]
                        })(
                            <Radio.Group>
                                <Radio value="设计审查检用安全检查表">设计审查检用安全检查表</Radio>
                                <Radio value="厂级安全检查表">厂级安全检查表</Radio>
                                <Radio value="车间安全检查表">车间安全检查表</Radio>
                                <Radio value="工段及岗位安全检查表">工段及岗位安全检查表</Radio>
                                <Radio value="专业性安全检查表">专业性安全检查表</Radio>
                            </Radio.Group>,
                        )}
                        </Form.Item>

                        <Form.Item label="所属部门">
                            {getFieldDecorator('deptId', {
                                rules: [{ required: true, message: '请选择部门!' }],
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

                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" htmlType="submit" disabled={formDisabled}>
                            提交
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div> 
        );
    }
}


const mapState = (state)=> {
    return {
      submitSuccess: state.getIn(['checkTable','submitSuccess'])
    }
  };
  
  /**
   * 将 操作 state的 函数传给组件的props 
   */
  const mapDispatch = (dispatch)=> {
    return {
      changeSubmitSuccess(value) {  //改变提交结果状态
        dispatch(actionCreator.changeSubmitSuccess(value));
      }
    }
  };

const WrappedNormalLoginForm = Form.create({ name: 'checktable_add' })(NormalLoginForm);

export default connect(mapState,mapDispatch)(WrappedNormalLoginForm);