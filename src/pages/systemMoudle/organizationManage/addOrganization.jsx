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
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('depName', {
            rules: [{ required: true, message: '请输入部门名字!' }],
          })(
            <Input
              placeholder="depName"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('depAddress', {
            rules: [{ required: true, message: '请输入部门地址!' }],
          })(
            <Input
              placeholder="depAddress"
            />,
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('depPhone', {
            rules: [{ required: true, message: '请输入部门电话!' }],
          })(
            <Input
              placeholder="depPhone"
            />,
          )}
        </Form.Item>

        <Form.Item>
          {
            getFieldDecorator('depDesc', {
                rules:[ { required: true, message: '请输入部门地址'} ],
            })(<Input placeholder="depDesc" />)
          }
        </Form.Item>
       </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;