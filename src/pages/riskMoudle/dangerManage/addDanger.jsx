import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import './style.css';


import {
    Form,
    Select,
    InputNumber,
    Radio,
    Slider,
    Button,
    Input,
    DatePicker
  } from 'antd';

    //文本域
  const { TextArea } = Input;

  const { Option } = Select;
  
  




//select开始
function onChange_0(value) {
  console.log(`selected ${value}`);
}






//select结束


  
  class Demo extends React.Component {
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    };
  
    normFile = e => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    };
  
    render() {
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
      return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>

          <Form.Item label="风险点ID">
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a ID"
            optionFilterProp="id"
            >
            <Option value="jack">123456</Option>
            <Option value="lucy">456123</Option>
            <Option value="tom">486532</Option>
            </Select>
          </Form.Item>
          
          <Form.Item label="危险源名称">
            <Input placeholder="" />
          </Form.Item>

          
          <Form.Item label="易发生的危险类型">
          <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a type"
              optionFilterProp="id"
              onChange={onChange_0}
            >
            <Option value="jack">jack</Option>
            <Option value="lucy">lucy</Option>
            <Option value="tom">tom</Option>
            </Select>
          </Form.Item>

        {/* 下边这三个需要校验处理 */}
          <Form.Item label="L(可能性)">
            <Input placeholder="" style={{width:"200px"}}/>
          </Form.Item>

          <Form.Item label="E(频繁程度)">
            <Input placeholder="" style={{width:"200px"}}/>
          </Form.Item>

          <Form.Item label="L(事故后果)">
            <Input placeholder="" style={{width:"200px"}}/>
          </Form.Item>

          <Form.Item label="危险源等级">
            {getFieldDecorator('slider')(
              <Slider
                marks={{
                  0: 'A',
                  20: 'B',
                  40: 'C',
                  60: 'D',
                  80: 'E',
                  100: 'F',
                }}
              />,
            )}
          </Form.Item>

          <Form.Item label="管理措施">
              <TextArea rows={4} placeholder="管理措施" />
            </Form.Item>

            <Form.Item label="管控层级">
            {getFieldDecorator('radio-group')(
              <Radio.Group>
                <Radio value="a">item 1</Radio>
                <Radio value="b">item 2</Radio>
                <Radio value="c">item 3</Radio>
              </Radio.Group>,
            )}
          </Form.Item>

            <Form.Item label="负责人单位">
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a ID"
            optionFilterProp="id"
           
            >
            <Option value="jack">123456</Option>
            <Option value="lucy">456123</Option>
            <Option value="tom">486532</Option>
            </Select>
          </Form.Item>

          <Form.Item label="负责人ID">
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a ID"
            optionFilterProp="id"
            >
            <Option value="jack">123456</Option>
            <Option value="lucy">456123</Option>
            <Option value="tom">486532</Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
  const WrappedDemo = Form.create({ name: 'validate_other' })(Demo);



class AddDanger extends Component {
    render() {
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>风险管理与评估</Breadcrumb.Item>
                    <Breadcrumb.Item>危险源管理</Breadcrumb.Item>
                    <Breadcrumb.Item>危险源添加</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap"  style={{paddingTop: "50px"}}>
                    <WrappedDemo goBack={this.props.history.goBack} />
                </div>
            </div>
        )
    }
}

export default AddDanger;