import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import './style.css';

import axios from 'axios';
import Qs from 'qs';
import memery from '../../../utils/memeryUtil';
import {
    Form,
    Select,
    InputNumber,
    Radio,
    Slider,
    Button,
    Input,
    message
  } from 'antd';

    //文本域
  const { TextArea } = Input;

  const { Option } = Select;
  
  









  
  class Demo extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        allDept:[],
        allRisk:[],
        id:'',
        riskId: '',
        name: '',
        type: '',
        l: '',
        e: '',
        c: '',
        degree: '',
        measure:'',
        level: '',
        deptId: '',
        userId: ''
      }

      this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
       // 获取所有部门的 id 和 name
       axios.get('/api/department/getAllDept').then(res=>{
        if(res.data.status === 1) {
            this.setState({
                allDept: res.data.list
            })
        }
      }).catch(error=>{
          message.error(error.message,2);
      })

      axios.get('/api/risk/getAllList').then(res=>{
          if(res.data.status === 1) {
              this.setState({
                allRisk: res.data.data
              })
          }else {
            message.error(res.data.message || '获取风险信息失败');
          }
      }).catch(error=>{
          message.error(error.message,2);
      });

      axios.post('/api/hazard/detail',Qs.stringify({id:this.props.dangerId}),{
        headers: {
          'Content-Type':'application/x-www-form-urlencoded;'
        }
      }).then(res=>{
          const data = res.data;
          if(data.status === 1) {
              this.setState({
                id: data.data.id,
                riskId: data.data.riskId,
                name: data.data.name,
                type: data.data.type,
                l: data.data.l,
                e: data.data.e,
                c: data.data.c,
                degree: data.data.degree,
                measure:data.data.measure,
                level: data.data.level,
                deptId: data.data.deptId,
                userId: data.data.userId
              })
          }else {
            message.error(data.message);
          }
      }).catch(error=>{
          message.error(error.message);
      })

    }


    handleSubmit(e) {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          let formdata = {
              id: this.props.dangerId,
              riskId: values.riskId,
              name: values.name,
              type: values.type,
              l: values.L,
              e: values.E,
              c: values.C,
              degree: values.degree,
              measure: values.measure,
              level: values.level,
              deptId: values.deptId,
              userId: this.state.userId
          }
          console.log(formdata)
          axios.post('/api/hazard/update',Qs.stringify(formdata),{
            headers: {
              'Content-Type':'application/x-www-form-urlencoded;'
           }
          }).then(res=>{
            if(res.data.status === 1) {
              message.success('添加成功');
              this.props.goBack();
            }else {
              message.error(res.data.message || '添加失败');
            }
          }).catch(error=>{
            message.error(error.message,2);
          })
          console.log('Received values of form: ', values);
        }
      });
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
          {getFieldDecorator('riskId', {
                  initialValue: this.state.riskId,
                  rules: [{ required: true, message: '请选择风险点ID!' }],
              })(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a ID"
                  >
                    {
                    this.state.allRisk.map(item=>(
                        <Select.Option value={item.id}>{item.name}</Select.Option>
                    ))
                }
                </Select>
              )}
          
          </Form.Item>
          
          <Form.Item label="危险源名称">
              {getFieldDecorator('name', {
                initialValue: this.state.name,
                  initialValue: '',
                  rules: [{ required: true, message: '请输入危险源名称!' }],
              })(
                <Input placeholder="" maxLength="20" />,
              )}
          </Form.Item>

          
          <Form.Item label="易发生的危险类型">
              {getFieldDecorator('type', {
                  initialValue: this.state.type,
                  rules: [{ required: true, message: '请输入危险源名称!' }],
              })(
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a type"
                  >
                  <Option value="第一类">第一类</Option>
                  <Option value="第二类">第二类</Option>
                  <Option value="第三类">第三类</Option>
                  <Option value="第四类">第四类</Option>
                </Select>
              )}
          
          </Form.Item>

        {/* 下边这三个需要校验处理 */}
          <Form.Item label="L(可能性)">
          {getFieldDecorator('L', {
                  initialValue: this.state.l,
                  rules: [{ required: true, message: 'L(可能性)!' }],
              })(
                <InputNumber min={0} max={100} />
              )}
          </Form.Item>

          <Form.Item label="E(频繁程度)">
          {getFieldDecorator('E', {
                  initialValue: this.state.e,
                  rules: [{ required: true, message: 'E(频繁程度)!' }],
              })(
                <InputNumber min={0} max={100} />
              )}  
          </Form.Item>

          <Form.Item label="C(事故后果)">
          {getFieldDecorator('C', {
                  initialValue: this.state.c,
                  rules: [{ required: true, message: 'C(事故后果)!' }],
              })(
                <InputNumber min={0} max={100} />
              )}  
          </Form.Item>

          <Form.Item label="危险源等级">
            {getFieldDecorator('degree',{
              initialValue: this.state.degree,
                  rules: [{ required: true, message: 'C(事故后果)!' }],
              })(
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
            {getFieldDecorator('measure',{
              initialValue: this.state.measure,
                  rules: [{ required: true, message: '输入管理措施!' }],
              })(
                <TextArea rows={4} placeholder="管理措施" maxLength="20" style={{maxHeight: "300px"}} />
            )}
              
            </Form.Item>

            <Form.Item label="管控层级">
            {getFieldDecorator('level',{
              initialValue: this.state.level,
                  rules: [{ required: true, message: '选择管控层级!' }],
              })(
              <Radio.Group>
                <Radio value="岗位">岗位</Radio>
                <Radio value="班组">班组</Radio>
                <Radio value="车间">车间</Radio>
                <Radio value="公司">公司</Radio>
              </Radio.Group>,
            )}
          </Form.Item>

            <Form.Item label="负责人单位">
            {getFieldDecorator('deptId',{
              initialValue: this.state.deptId,
                  rules: [{ required: false, message: '选择管控层级!' }],
              })(
                <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a ID"
                optionFilterProp="id"
              
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
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
  const WrappedDemo = Form.create({ name: 'validate_other' })(Demo);



class UpdateDanger extends Component {
    render() {
        console.log(this.props.match.params.id, 'hhhhhhhhhhhhh')
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>风险管理与评估</Breadcrumb.Item>
                    <Breadcrumb.Item>危险源管理</Breadcrumb.Item>
                    <Breadcrumb.Item>危险源修改</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap"  style={{paddingTop: "50px"}}>
                    <WrappedDemo dangerId={this.props.match.params.id} goBack={this.props.history.goBack} />
                </div>
            </div>
        )
    }
}

export default UpdateDanger;