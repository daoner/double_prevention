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


  const { Option } = Select;
  //经济输入框开始
  class PriceInput extends React.Component {
    static getDerivedStateFromProps(nextProps) {
      // Should be a controlled component.
      if ('value' in nextProps) {
        return {
          ...(nextProps.value || {}),
        };
      }
      return null;
    }
  
    constructor(props) {
      super(props);
  
      const value = props.value || {};
      this.state = {
        number: value.number || 0,
        currency: value.currency || 'rmb',
      };
    }
  
    handleNumberChange = e => {
      const number = parseInt(e.target.value || 0, 10);
      if (isNaN(number)) {
        return;
      }
      if (!('value' in this.props)) {
        this.setState({ number });
      }
      this.triggerChange({ number });
    };
  
    handleCurrencyChange = currency => {
      if (!('value' in this.props)) {
        this.setState({ currency });
      }
      this.triggerChange({ currency });
    };
  
    triggerChange = changedValue => {
      // Should provide an event to pass value to Form.
      const { onChange } = this.props;
      if (onChange) {
        onChange({
          ...this.state,
          ...changedValue,
        });
      }
    };
  
    render() {
      const { size } = this.props;
      const { currency, number } = this.state;
      return (
        <span>
          <Input
            type="text"
            size={size}
            value={number}
            onChange={this.handleNumberChange}
            style={{ width: '65%', marginRight: '3%' }}
          />
          <Select
            value={currency}
            size={size}
            style={{ width: '32%' }}
            onChange={this.handleCurrencyChange}
          >
            <Option value="rmb">RMB</Option>
            <Option value="dollar">Dollar</Option>
          </Select>
        </span>
      );
    }
  }
  
  class Eco_Demo extends React.Component {
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    };
  
    checkPrice = (rule, value, callback) => {
      if (value.number > 0) {
        callback();
        return;
      }
      callback('Price must greater than zero!');
    };
  
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        // <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('price', {
              initialValue: { number: 0, currency: 'rmb' },
              rules: [{ validator: this.checkPrice }],
            })(<PriceInput />)}
          </Form.Item>
        //   <Form.Item>
        //     <Button type="primary" htmlType="submit">
        //       Submit
        //     </Button>
        //   </Form.Item>
        // </Form>
      );
    }
  }
  
  const Eco_Input = Form.create({ name: 'customized_form_controls' })(Eco_Demo);
//经济输入框结束



//select开始
function onChange_0(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}
//select结束


  const { TextArea } = Input;

  const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
  
  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  
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
          <Form.Item label="事故ID">
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a ID"
            optionFilterProp="id"
            onChange={onChange_0}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            >
            <Option value="jack">123456</Option>
            <Option value="lucy">456123</Option>
            <Option value="tom">486532</Option>
            </Select>
          </Form.Item>

          <Form.Item label="员工ID">
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a ID"
            optionFilterProp="id"
            onChange={onChange_0}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            >
            <Option value="jack">123456</Option>
            <Option value="lucy">456123</Option>
            <Option value="tom">486532</Option>
            </Select>
          </Form.Item>
          
          <Form.Item label="工伤鉴定等级">
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

          <Form.Item label="伤害性质">
            {getFieldDecorator('radio-group')(
              <Radio.Group>
                <Radio value="a">item 1</Radio>
                <Radio value="b">item 2</Radio>
                <Radio value="c">item 3</Radio>
              </Radio.Group>,
            )}
          </Form.Item>

          <Form.Item label="损失工作日">
            {getFieldDecorator('input-number', { initialValue: 3 })(<InputNumber min={1} max={10} />)}
            <span className="ant-form-text"> 天</span>
          </Form.Item>


          <Form.Item label="伤害程度">
            {getFieldDecorator('slider2')(
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

          <Form.Item label="致害物">
            <Input placeholder="" />
          </Form.Item>

          <Form.Item label="伤害部位">
            <Input placeholder="" />
          </Form.Item>

          <Form.Item label="赔偿金额">
            <Eco_Input />
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



class WoundeAdd extends Component {
    render() {
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>事故管理与统计</Breadcrumb.Item>
                    <Breadcrumb.Item>添加伤亡信息</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap">
                    <WrappedDemo />
                </div>
            </div>
        )
    }
}

export default WoundeAdd;