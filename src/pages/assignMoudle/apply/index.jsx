import React, { Component } from 'react';
import axios from 'axios';

import './style.css';

import { Breadcrumb, Form, Input, Button, DatePicker,InputNumber,Slider,Switch, message } from 'antd';
import { formateDate } from '../../../utils/dateUtil';
import memery from '../../../utils/memeryUtil';
 
//日期
const { RangePicker } = DatePicker;



//文本域
const { TextArea } = Input;

class FormLayoutDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formLayout: 'horizontal',
    };

    this.handleSubmit = this.handleSubmit.bind(this);

  }


    /**
     * 提交事件
     */
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          //要提交的数据
          const data = {
            //id
            deptId: memery.deptId,  //当前用户的部门id
            applyDate: formateDate(new Date(), 'yyyy-MM-dd'),//申请时间
            status: 11111,    //状态
            keepFile: values.keepFile,    //是否归档
            name: values.name,    //申请的项目名
            startDate: formateDate(new Date(values.startDate[0]._d),'yyyy-MM-dd'),  //开始时间
            endDate: formateDate(new Date(values.startDate[1]._d),'yyyy-MM-dd'), //结束时间
            place: values.place, //作业地点
            applyPerson: values.applyPerson, //申请人姓名
            curator: values.curator,  //单位负责人姓名
            content: values.content,  //内容
            number: values.number, //作业人数
            majorFactor: values.majorFactor, //主要危险因素
            safeMeasure: values.safeMeasure,  //安全措施
            keepYear: values.keepYear //保存年限

          }
          console.log(data);
          
          axios.post('', {

          }).then(res=>{
            message.success('添加成功');
          }).catch(error=>{
            message.error(error.message || '添加失败');
          })

          console.log('Received values of form: ', values);
        }else {
          console.log(memery.user)
          // console.log(err,values)
          message.info('请正确填写必要信息!')
        }
      });
    };


  handleFormLayoutChange = e => {
    this.setState({ formLayout: e.target.value });
  };

  render() {

    const { getFieldDecorator } = this.props.form;
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
        <Form layout={formLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="项目名称" {...formItemLayout}>
              {getFieldDecorator('name', {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入项目名称!' }],
              })(<Input maxLength="20" placeholder="双重预防机制管理系统" />)} 
          </Form.Item>

          <Form.Item label="项目内容" {...formItemLayout}>
            {getFieldDecorator('content', {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入项目内容!' }],
              })(<TextArea style={{maxHeight:"100px"}} maxLength="20" rows={4} placeholder="双重预防机制管理系统的内容" />)}
          </Form.Item>

          <Form.Item label="是否归档" {...formItemLayout}>
            {getFieldDecorator('keepFile', { 
              rules: [{ required: true, message: '请选择是否归档!' }], 
              })(<Switch />)}
          </Form.Item>

          <Form.Item label="作业人数" {...formItemLayout}>
            {getFieldDecorator('number', { 
              initialValue: 0 ,
              rules: [{ required: true, message: '请输入作业人数!' }], 
              })(<InputNumber min={1} max={1000} />)}
          </Form.Item>

          <Form.Item label="起止时间" {...formItemLayout}>
            {getFieldDecorator('startDate', {
              rules: [{ required: true, message: '请选择起止时间!' }], 
            })(<RangePicker />)}
          </Form.Item>

          <Form.Item label="作业地点" {...formItemLayout}>
            {getFieldDecorator('place', {
                rules: [{ required: true, message: '请输入作业地点!' }], 
                initialValue: ''
            })(<Input placeholder="武汉理工大学余家头校区" />)}
          </Form.Item>
          
          <Form.Item label="保存年限" {...formItemLayout}>
            {getFieldDecorator('keepYear', {
                rules: [{ required: true, message: '请输入作业地点!' }], 
                initialValue: ''
            })(<Slider
                marks={{
                  0: '0',
                  20: '20',
                  40: '40',
                  60: '60',
                  80: '80',
                  100: '100',
                }}
            />)}
          </Form.Item>

          <Form.Item label="主要危险因素" {...formItemLayout}>
            {getFieldDecorator('majorFactor', {
                rules: [{ required: true, message: '请输入危险因素!' }], 
                initialValue: ''
            })(<TextArea rows={4} style={{maxHeight:"100px"}} placeholder="1.自然环境" />)}
          </Form.Item>

          <Form.Item label="安全措施" {...formItemLayout}>
            {getFieldDecorator('safeMeasure', {
                rules: [{ required: true, message: '请输入安全措施!' }], 
                initialValue: ''
            })(<TextArea rows={4} style={{maxHeight:"100px"}} placeholder="1.佩戴安全帽" />)}
          </Form.Item>

          <Form.Item label="申请人姓名" {...formItemLayout}>
            {getFieldDecorator('applyPerson', {
                rules: [{ required: true, message: '请输入申请人姓名!' }], 
                initialValue: ''
            })(<Input maxLength="5" placeholder="张某某" />)}
          </Form.Item>

          <Form.Item label="单位负责人姓名" {...formItemLayout}>
            {getFieldDecorator('curator', {
                rules: [{ required: true, message: '请输入单位负责人姓名!' }], 
                initialValue: ''
            })(<Input maxLength="5" placeholder="李某某" />)}
            
          </Form.Item>

          <Form.Item {...buttonItemLayout}>
            <Button type="primary">打印</Button>
            <Button type="primary" style={{float:"right"}} htmlType="submit">提交</Button>
            <Button style={{float:"right",margin:"0px 20px 0px 0px"}} htmlType="reset">取消</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const ApplyForm = Form.create({ name: 'apply_form' })(FormLayoutDemo);



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
                    <ApplyForm />
                </div>
            </div>
        )
    }
}

export default Apply;