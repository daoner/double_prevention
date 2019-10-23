import React from 'react';
import { Breadcrumb, Form, Icon, Input, Button, message } from 'antd';
import axios from 'axios';
import Qs from 'qs';
//this.props.match.params.id
class UpdateRisk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //风险信息 id name place level telephone
            id: '',
            name: '',
            place: '',
            level: '',
            telephone: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * 挂在时获取风险的信息
     */
    componentDidMount() {
        axios.get(`/api/risk/detail?id=${this.props.match.params.id}`).then(res=>{
            const data = res.data;
            if(data.status === 1) {
                this.setState({
                    id: data.data.id,
                    name: data.data.name,
                    place: data.data.place,
                    level: data.data.level,
                    telephone: data.data.telephone
                });
                message.success('修改成功');
                this.props.history.goBack();
            }else {
                message.error(data.message || '获取信息失败');
            }
        }).catch(error=>{
            message.error(error.message);
        })
    }

    /**
     * 数据提交
     */
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            //提交的数据
            const formdata = {
                id: this.state.id,
                name: values.name,
                place: values.place,
                level:  values.level,
                telephone: values.telephone
            }

            axios.post('/api/risk/update',Qs.stringify(formdata),{
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
                }
            }).then(res=>{
                message.success( res.data.message || '添加成功');
                this.props.history.goBack();        //回退
            }).catch(error=>{
                message.error(error.message);
            })
          }else {
              message.info('请填写相关信息');
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
                    <Input placeholder="风险点" value={this.state.name}    />,
                )}
                </Form.Item>
               

                <Form.Item label="风险点位置：">
                {getFieldDecorator('place', {
                    rules: [{ required: true, message: '请输入风险点位置!' }],
                })(
                    <Input placeholder="风险点位置"  value={this.state.place}  />,
                )}
                </Form.Item>

                <Form.Item label="风险点等级：">
                {getFieldDecorator('level', {
                    rules: [{ required: true, message: '请选择风险点等级!' }],
                })(
                    <Input
                     placeholder="风险点等级" value={this.state.level}
                    />,
                )}
                </Form.Item>

                <Form.Item label="应急电话：">
                {getFieldDecorator('telephone', {
                    rules: [{ required: true, message: '请输入应急电话!' }],
                })(
                    <Input placeholder="应急电话" value={this.state.telephone} />,
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

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(UpdateRisk);

export default WrappedHorizontalLoginForm;