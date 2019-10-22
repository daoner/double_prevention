import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" labelCol={{span:4}} wrapperCol={{span:16}}>
        <Form.Item label="部门名称">
          {getFieldDecorator('depName', {
            rules: [{ required: true, message: '请输入部门名字!' }],
          })(
            <Input maxLength="20"/>,
          )}
        </Form.Item>
        <Form.Item label="部门地址">
          {getFieldDecorator('deptAddress', {
            rules: [{ required: true, message: '请输入部门地址!' }],
          })(
            <Input maxLength="20"/>,
          )}
        </Form.Item>

        <Form.Item label="部门电话">
          {getFieldDecorator('deptPhone', {
            rules: [{ required: true, message: '请输入部门电话!' }],
          })(
            <Input maxLength="15" />,
          )}
        </Form.Item>
        <Form.Item label="部门简介">
          {
            getFieldDecorator('deptDesc', {
                rules:[ { required: true, message: '请输入部门简介'} ],
            })(<Input maxLength="20" />)
          }
        </Form.Item>
       </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'organization_add' })(NormalLoginForm);

export default WrappedNormalLoginForm;