import React from 'react';
import { Breadcrumb, Form, Icon, Input, Button, message } from 'antd';
import axios from 'axios';
import Qs from 'qs';

class AddRisk extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            //提交的数据
            const formdata = {
                name: values.name,
                place: values.place,
                level:  values.level,
                telephone: values.telephone
            }

            axios.post('/api/risk/insert',Qs.stringify(formdata),{
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
                }
            }).then(res=>{
                message.success( res.data.message || '添加成功');
                this.props.history.goBack();        //回退
            }).catch(error=>{
                message.error(error.message);
            })
          }
        });
      };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
    return (
        <div className="page">
            {/* 导航路径 */}
            <Breadcrumb className="path">
                    <Breadcrumb.Item>风险管理与评估</Breadcrumb.Item>
                    <Breadcrumb.Item>风险管理</Breadcrumb.Item>
                    <Breadcrumb.Item>风险添加</Breadcrumb.Item>
                </Breadcrumb>
            {/* 内容区域 */}
            <div className="contentWrap" style={{paddingTop: "50px"}}>
               

            <Form {...formItemLayout } onSubmit={this.handleSubmit}>
                <Form.Item  label="风险点：">
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入风险点!' }],
                })(
                    <Input
                    placeholder="风险点"
                    />,
                )}
                </Form.Item>
               

                <Form.Item label="风险点位置：">
                {getFieldDecorator('place', {
                    rules: [{ required: true, message: '请输入风险点位置!' }],
                })(
                    <Input placeholder="风险点位置"    />,
                )}
                </Form.Item>

                <Form.Item label="风险点等级：">
                {getFieldDecorator('level', {
                    rules: [{ required: true, message: '请选择风险点等级!' }],
                })(
                    <Input
                    placeholder="风险点等级"
                    />,
                )}
                </Form.Item>

                <Form.Item label="应急电话：">
                {getFieldDecorator('telephone', {
                    rules: [{ required: true, message: '请输入应急电话!' }],
                })(
                    <Input placeholder="应急电话"  />,
                )}
                </Form.Item>

                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
            </div>
        </div>
   
    );
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(AddRisk);

export default WrappedHorizontalLoginForm;