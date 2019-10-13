import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

class AddRisk extends React.Component {
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    return (
        <div className="page">
            {/* 内容区域 */}
            <h3 style={{fontSize: '32px'}}>添加风险信息</h3>
            <hr/>
            <div className="contentWrap" style={{ width:"800px",margin: '0 auto' }}>
               
            <Form onSubmit={this.handleSubmit}>
                <Form.Item  label="风险点：">
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: '请输入风险点!' }],
                })(
                    <Input
                    style={{ width: 400 }}
                    placeholder="Username"
                    />,
                )}
                </Form.Item>
               

                <Form.Item label="风险点位置：">
                {getFieldDecorator('place', {
                    rules: [{ required: true, message: '请输入风险点位置!' }],
                })(
                    <Input
                    id="place"
                    style={{ width: 400 }}
                    />,
                )}
                </Form.Item>

                <Form.Item label="风险点等级：">
                {getFieldDecorator('level', {
                    rules: [{ required: true, message: '请选择风险点等级!' }],
                })(
                    <Input
                    id="level"
                    style={{ width: 400 }}
                    />,
                )}
                </Form.Item>

                <Form.Item label="应急电话：">
                {getFieldDecorator('telephone', {
                    rules: [{ required: true, message: '请输入应急电话!' }],
                })(
                    <Input
                    id="telephone"
                    style={{ width: 400 }}
                    />,
                )}
                </Form.Item>

                <Form.Item>
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