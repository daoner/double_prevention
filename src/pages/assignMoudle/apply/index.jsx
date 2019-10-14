import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import './style.css';

import { Form, Input, Button, DatePicker,InputNumber,Slider,Switch } from 'antd';

  
//保存年限开始
  class Demo_Slider extends React.Component {
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
          <Form.Item>
            {getFieldDecorator('slider')(
              <Slider
                marks={{
                  0: '0',
                  20: '20',
                  40: '40',
                  60: '60',
                  80: '80',
                  100: '100',
                }}
              />,
            )}
          </Form.Item>
      );
    }
  }
  
  const YearsLimit = Form.create({ name: 'validate_other_0' })(Demo_Slider);
//保存年限结束



//作业人数开始
class Demo_InputNumber extends React.Component {
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form.Item>
          {getFieldDecorator('input-number', { initialValue: 3 })(<InputNumber min={1} max={10} />)}
        </Form.Item>
      );
    }
  }
  
  const PeopleNumber = Form.create({ name: 'validate_other_1' })(Demo_InputNumber);
//作业人数结束


//是否归档开始
class Demo_Switch extends React.Component {
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form.Item>
            {getFieldDecorator('switch', { valuePropName: 'checked' })(<Switch />)}
        </Form.Item>
      );
    }
  }
  
  const WhetherFile = Form.create({ name: 'validate_other_2' })(Demo_Switch);
//是否归档结束



//日期
const { RangePicker } = DatePicker;
//日期
function onChange(date, dateString) {
  console.log(date, dateString);
}


//文本域
const { TextArea } = Input;

class FormLayoutDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal',
    };
  }

  handleFormLayoutChange = e => {
    this.setState({ formLayout: e.target.value });
  };

  render() {
    const { formLayout } = this.state;
    const formItemLayout =
      formLayout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : null;
    const buttonItemLayout =
      formLayout === 'horizontal'
        ? {
            wrapperCol: { span: 14, offset: 4 },
          }
        : null;
    return (
      <div>
        <Form layout={formLayout}>
          <Form.Item label="项目名称" {...formItemLayout}>
            <Input placeholder="双重预防机制管理系统" />
          </Form.Item>
          <Form.Item label="项目内容" {...formItemLayout}>
            <TextArea rows={4} placeholder="双重预防机制管理系统的内容" />
          </Form.Item>

          <Form.Item label="是否归档" {...formItemLayout}>
            <WhetherFile  />
          </Form.Item>

          <Form.Item label="作业人数" {...formItemLayout}>
            <PeopleNumber />
          </Form.Item>

          <Form.Item label="起止时间" {...formItemLayout}>
            <RangePicker onChange={onChange} />
          </Form.Item>
          <Form.Item label="作业地点" {...formItemLayout}>
            <Input placeholder="武汉理工大学余家头校区" />
          </Form.Item>
          
          <Form.Item label="保存年限" {...formItemLayout}>
            <YearsLimit  />
          </Form.Item>

          <Form.Item label="主要危险因素" {...formItemLayout}>
            <TextArea rows={4} placeholder="1.自然环境" />
          </Form.Item>

          <Form.Item label="安全措施" {...formItemLayout}>
            <TextArea rows={4} placeholder="1.佩戴安全帽" />
          </Form.Item>

          <Form.Item label="申请人姓名" {...formItemLayout}>
            <Input placeholder="张某某" />
          </Form.Item>

          <Form.Item label="单位负责人姓名" {...formItemLayout}>
            <Input placeholder="李某某" />
          </Form.Item>

          <Form.Item {...buttonItemLayout}>
            <Button type="primary">打印</Button>
            <Button type="primary" style={{float:"right"}}>提交</Button>
            <Button style={{float:"right",margin:"0px 20px 0px 0px"}}>取消</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

class Apply extends Component {
    render() {
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>授权许可</Breadcrumb.Item>
                    <Breadcrumb.Item>作业申请</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap">
                    <FormLayoutDemo />
                </div>
            </div>
        )
    }
}

export default Apply;