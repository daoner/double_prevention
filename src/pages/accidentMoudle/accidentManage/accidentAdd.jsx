import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { actionCreator } from './store';

import './style.css';
import { formateDate } from '../../../utils/dateUtil';
import {
    Form,
    Select,
    InputNumber,
    Radio,
    Slider,
    Button,
    Checkbox,
    Row,
    Col,
    Input,
    DatePicker
  } from 'antd';
const { Option } = Select;
const { TextArea } = Input;


  
class Demo extends React.Component {
    /**
     * 提交事件
     */
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }else {
          console.log(err,values)
          console.log(formateDate(new Date(values.date._d),'yyyy-MM-dd hh:mm:ss'))
        }
      });

      this.props.changeSubmitSuccess();   //成功了就修改 submitSuccess为true ，这样就返回列表页

    };
      
  
    // normFile = e => {
    //   console.log('Upload event:', e);
    //   if (Array.isArray(e)) {
    //     return e;
    //   }
    //   return e && e.fileList;
    // };
  
    render() {
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };


      



      return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="事故类型ID">
          {getFieldDecorator('id', {
              rules: [{ required: true, message: '请选择事故类型!' }],
            })(
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a ID"
                optionFilterProp="id"
                // onChange={onChange_0}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={onSearch}
                filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                >
                <Option value="1">类型一</Option>
                <Option value="2">类型一</Option>
                <Option value="3">类型一</Option>
              </Select>,
            )}
            
          </Form.Item>
          
          <Form.Item label="事故名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入事故名称!' }],
            })(
              <Input placeholder="" />,
            )}
          </Form.Item>
          <Form.Item label="事故发生地点">
            {getFieldDecorator('place', {
              rules: [{ required: true, message: '请输入事故地点!' }],
            })(
              <Input placeholder="" />,
            )}
          </Form.Item>
          <Form.Item label="事故发生时间">
            {getFieldDecorator('date', {
              rules: [{ required: true, message: '请确定事故发生时间!' }],
            })(
              <DatePicker />,
            )}
          </Form.Item>
          <Form.Item label="事故处理状态">
            {getFieldDecorator('status', {
                rules: [{ required: true, message: '请选择事故处理状态!' }],
              })(
                <Radio.Group>
                <Radio value="a">待处理</Radio>
                <Radio value="b">处理中</Radio>
                <Radio value="c">已处理</Radio>
              </Radio.Group>,
              )}
          </Form.Item>
          <Form.Item label="事故性质">
            {getFieldDecorator('nature', {
               rules: [{ required: true, message: '请选择事故性质!' }],
            })(
              <Radio.Group>
                <Radio value="自然事故">自然事故</Radio>
                <Radio value="技术事故">技术事故</Radio>
                <Radio value="责任事故">责任事故</Radio>
              </Radio.Group>,
              // <Checkbox.Group style={{ width: '100%' }}>
              //   <Row>
              //     <Col span={8}>
              //       <Checkbox value="A">A</Checkbox>
              //     </Col>
              //     <Col span={8}>
              //       <Checkbox disabled value="B">
              //         B
              //       </Checkbox>
              //     </Col>
              //     <Col span={8}>
              //       <Checkbox value="C">C</Checkbox>
              //     </Col>
              //     <Col span={8}>
              //       <Checkbox value="D">D</Checkbox>
              //     </Col>
              //     <Col span={8}>
              //       <Checkbox value="E">E</Checkbox>
              //     </Col>
              //   </Row>
              // </Checkbox.Group>,
            )}
          </Form.Item>

          <Form.Item label="严重级别">
            {getFieldDecorator('level', {
               rules: [{ required: true, message: '请选择事故严重级别!' }],
            })(
              <Slider
                step={null}
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
          <Form.Item label="事故原因">
            {getFieldDecorator('reason', {
               rules: [{ required: true, message: '请输入事故原因!' }],
            })(
              <TextArea maxLength={20} rows={4} placeholder="发生事故的原因是。。。" />,
            )}
          </Form.Item>

          {/* 下边这两个经济需要进行区分 */}
          <Form.Item label="直接经济损失">
            {getFieldDecorator('directLoss',{
              rules:[{ pattern: /^[0-9]+$/ ,message:'只能输入数字' },
                  { whitespace: true,  message: '不能输入空格',}
              ]
            })(
              <Input
                type="text"
                style={{ width: '65%', marginRight: '3%' }}
              />,
            )}
            <span>RMB</span>
          </Form.Item>
          <Form.Item label="间接经济损失">
            {getFieldDecorator('indirectLoss',{
              rules:[{ pattern: /^[0-9]+$/ ,message:'只能输入数字' },
                  { whitespace: true,  message: '不能输入空格',}
              ]
            })(
              <Input
                type="text"
                style={{ width: '65%', marginRight: '3%' }}
              />,
            )}
            <span>RMB</span>
          </Form.Item>

          <Form.Item label="损失工作日">
            {getFieldDecorator('lossWorkDay', { initialValue: 0 })(<InputNumber min={0} max={999} />)}
            <span className="ant-form-text"> 天</span>
          </Form.Item>
          <Form.Item label="停产小时数">
            {getFieldDecorator('outageTime', { initialValue: 0 })(<InputNumber min={0} max={999} />)}
            <span className="ant-form-text"> 时</span>
          </Form.Item>

          <Form.Item label="事故概况">
            {getFieldDecorator('survey')(
              <Input maxLength={20} placeholder="" />  
            )}
          </Form.Item>

          <Form.Item label="事故原因分析">
            {getFieldDecorator('causeAnalysis')(
              <TextArea maxLength={20} rows={4} placeholder="事故原因分析...." />
            )}
          </Form.Item>

          <Form.Item label="事故伤害情况">
            {getFieldDecorator('injure')(
              <TextArea maxLength={20}  rows={4} placeholder="没有情况。。。" />
            )}
          </Form.Item>

          <Form.Item label="事故损失程度">
            {getFieldDecorator('lossDegree')(
              <Slider
                step={null}
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

          <Form.Item label="处理意见">
            {getFieldDecorator('resolution')(
             <TextArea maxLength={20} rows={4} placeholder="我没有意见。。。" />,
            )}
          </Form.Item>

          <Form.Item label="事故教训">
            {getFieldDecorator('lesson')(
             <TextArea maxLength={20} rows={4} placeholder="教训是。。。" />,
            )}
          </Form.Item>

          <Form.Item label="处理措施">
            {getFieldDecorator('measure')(
              <TextArea maxLength={20} rows={4} placeholder="对不起没有处理措施。。。" />,
            )}
          </Form.Item>

          <Form.Item label="备注">
            {getFieldDecorator('remark')(
              <TextArea maxLength={20} rows={4} placeholder="对不起没有备注。。。" />,
            )}
          </Form.Item>
  
          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
/**
 * 将 redux 管理的 state 传给 组件的props
 */
const mapStateToForm = (state)=> {
  return {
    submitSuccess: state.getIn(['accident','submitSuccess'])
  }
};

/**
 * 将 操作 state的 函数传给组件的props 
 */
const mapDispatchToForm = (dispatch)=> {
  return {
    changeSubmitSuccess() {
      dispatch(actionCreator.changeSubmitSuccess(true));
    }
  }
};

const WrappedDemo = connect(mapStateToForm,mapDispatchToForm)(Form.create({ name: 'validate_other' })(Demo));

  




class AccidentAdd extends Component {
    render() {
        const { submitSuccess } = this.props;
        
        if(submitSuccess === true) {
          return <Redirect to="/main/accident/manage" />
        }else {
          console.log(submitSuccess,'form xxxxxxx');
        }

        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>事故管理与统计</Breadcrumb.Item>
                    <Breadcrumb.Item>事故信息管理</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap" >
                    <WrappedDemo />
                </div>
            </div>
        )
    }
}

/**
 * 将 redux 管理的 state 传给 组件的props
 */
const mapState = (state)=> {
  return {
    submitSuccess: state.getIn(['accident','submitSuccess'])
  }
};

/**
 * 将 操作 state的 函数传给组件的props 
 */
const mapDispatch = (dispatch)=> {
  return {

  }
};

export default connect(mapState,mapDispatch)(AccidentAdd);